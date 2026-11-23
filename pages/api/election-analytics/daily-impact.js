import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/dbConnect';
import DailyElectionImpact from '@/models/DailyElectionImpact';
import { runDaily4CallPipeline } from '@/lib/dailyPipeline';

const DATA_FILE = path.join(process.cwd(), 'lib', 'electionData', 'nandedDailyImpact.json');
const TMP_FILE = path.join('/tmp', 'nandedDailyImpact.json');

// In-memory cache for ultra-fast response on serverless
let inMemoryCache = null;

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { refresh } = req.query;

  // 1. Forced Refresh or Manual Trigger
  if (refresh === 'true' || req.method === 'POST') {
    try {
      // Check MongoDB for last update timestamp for 15-minute anti-abuse guard
      let lastDoc = null;
      try {
        await dbConnect();
        lastDoc = await DailyElectionImpact.findOne().sort({ createdAt: -1 }).lean();
      } catch (dbErr) {
        console.warn('DB check warning before refresh:', dbErr.message);
      }

      if (lastDoc && lastDoc.updatedAt && refresh === 'true') {
        const minutesSinceLastUpdate = (Date.now() - new Date(lastDoc.updatedAt).getTime()) / (1000 * 60);
        if (minutesSinceLastUpdate < 15) {
          return res.status(200).json({
            ...lastDoc,
            _cached: true,
            _rateLimited: true,
            _source: 'MongoDB Atlas (visitorpatil)',
            message: `Data was updated ${Math.round(minutesSinceLastUpdate)} minutes ago in MongoDB Atlas. Refreshes are rate-limited to preserve daily API quotas.`
          });
        }
      }

      // Execute 4-call pipeline directly in pure Node.js
      const freshData = await runDaily4CallPipeline();
      inMemoryCache = freshData;

      return res.status(200).json({
        ...freshData,
        _fresh: true,
        _source: 'MongoDB Atlas (visitorpatil)',
        message: 'Daily impact data successfully generated and saved to MongoDB Atlas (visitorpatil).'
      });
    } catch (err) {
      console.error('Pipeline error:', err);
      // Fallback to latest available if error
      if (inMemoryCache) {
        return res.status(200).json({
          ...inMemoryCache,
          _cached: true,
          warning: 'Refresh experienced a temporary network issue. Showing latest cached pulse.'
        });
      }
    }
  }

  // 2. Regular GET: Fetch latest record from MongoDB Atlas
  try {
    await dbConnect();
    const latestDoc = await DailyElectionImpact.findOne().sort({ createdAt: -1 }).lean();

    if (latestDoc) {
      inMemoryCache = latestDoc;
      return res.status(200).json({
        ...latestDoc,
        _source: 'MongoDB Atlas (visitorpatil)',
        _database: 'visitorpatil',
        _collection: 'dailyelectionimpacts',
        _cached: true
      });
    }

    // Auto-seed if collection in MongoDB is empty
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const seedData = JSON.parse(raw);
      const created = await DailyElectionImpact.create({
        date: new Date().toISOString().split('T')[0],
        ...seedData
      });
      return res.status(200).json({
        ...created.toObject(),
        _source: 'MongoDB Atlas (visitorpatil)',
        _seeded: true
      });
    }
  } catch (mongoErr) {
    console.warn('MongoDB query warning in daily-impact.js:', mongoErr.message);
  }

  // 3. Fallback to Memory Cache or Local File if MongoDB Atlas has transient network disconnect
  if (inMemoryCache) {
    return res.status(200).json({
      ...inMemoryCache,
      _source: 'In-Memory Fallback',
      _cached: true
    });
  }

  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const fileData = JSON.parse(raw);
      return res.status(200).json({
        ...fileData,
        _source: 'Local Backup File',
        _cached: true
      });
    } catch (_) {}
  }

  if (fs.existsSync(TMP_FILE)) {
    try {
      const raw = fs.readFileSync(TMP_FILE, 'utf-8');
      const tmpData = JSON.parse(raw);
      return res.status(200).json({
        ...tmpData,
        _source: 'Tmp Backup File',
        _cached: true
      });
    } catch (_) {}
  }

  return res.status(500).json({
    error: 'No daily impact data available. Please trigger a refresh.'
  });
}
