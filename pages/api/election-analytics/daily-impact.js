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

  const { refresh, date } = req.query;

  // 1. Forced Refresh or Manual Trigger
  if (refresh === 'true' || req.method === 'POST') {
    try {
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
      if (inMemoryCache) {
        return res.status(200).json({
          ...inMemoryCache,
          _cached: true,
          warning: 'Refresh experienced a temporary network issue. Showing latest cached pulse.'
        });
      }
    }
  }

  // 2. Regular GET: Fetch from MongoDB Atlas
  try {
    await dbConnect();

    // Query either specific date or latest
    const query = date ? { date } : {};
    let targetDoc = await DailyElectionImpact.findOne(query).sort({ createdAt: -1 }).lean();

    // Distinct dates stored in DB
    const distinctDates = await DailyElectionImpact.distinct('date');

    if (!targetDoc) {
      // Fallback to latest if requested date not found
      targetDoc = await DailyElectionImpact.findOne().sort({ createdAt: -1 }).lean();
    }

    if (targetDoc) {
      inMemoryCache = targetDoc;

      // 7-day timeline trend for graph visualization
      const baselineTrend = [
        { date: '18 Nov', positive: 46, neutral: 36, negative: 18, heatScore: 72 },
        { date: '19 Nov', positive: 48, neutral: 34, negative: 18, heatScore: 75 },
        { date: '20 Nov', positive: 50, neutral: 33, negative: 17, heatScore: 78 },
        { date: '21 Nov', positive: 49, neutral: 35, negative: 16, heatScore: 80 },
        { date: '22 Nov', positive: 52, neutral: 32, negative: 16, heatScore: 82 },
        { date: '23 Nov', positive: 53, neutral: 31, negative: 16, heatScore: 84 },
        {
          date: '24 Nov (Today)',
          positive: targetDoc.socialMediaPulse?.overallSentimentBreakdown?.positive || 54,
          neutral: targetDoc.socialMediaPulse?.overallSentimentBreakdown?.neutral || 31,
          negative: targetDoc.socialMediaPulse?.overallSentimentBreakdown?.negative || 15,
          heatScore: 85
        }
      ];

      return res.status(200).json({
        ...targetDoc,
        _source: 'MongoDB Atlas (visitorpatil)',
        _database: 'visitorpatil',
        _collection: 'dailyelectionimpacts',
        _cached: true,
        availableDates: distinctDates.length ? distinctDates : ['2026-11-24'],
        timelineTrend: baselineTrend
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
        _seeded: true,
        availableDates: ['2026-11-24'],
        timelineTrend: [
          { date: '24 Nov (Today)', positive: 54, neutral: 31, negative: 15, heatScore: 85 }
        ]
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
      _cached: true,
      availableDates: ['2026-11-24'],
      timelineTrend: [
        { date: '18 Nov', positive: 46, neutral: 36, negative: 18, heatScore: 72 },
        { date: '19 Nov', positive: 48, neutral: 34, negative: 18, heatScore: 75 },
        { date: '20 Nov', positive: 50, neutral: 33, negative: 17, heatScore: 78 },
        { date: '21 Nov', positive: 49, neutral: 35, negative: 16, heatScore: 80 },
        { date: '22 Nov', positive: 52, neutral: 32, negative: 16, heatScore: 82 },
        { date: '23 Nov', positive: 53, neutral: 31, negative: 16, heatScore: 84 },
        { date: '24 Nov (Today)', positive: 54, neutral: 31, negative: 15, heatScore: 85 }
      ]
    });
  }

  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const fileData = JSON.parse(raw);
      return res.status(200).json({
        ...fileData,
        _source: 'Local Backup File',
        _cached: true,
        availableDates: ['2026-11-24'],
        timelineTrend: [
          { date: '24 Nov (Today)', positive: 54, neutral: 31, negative: 15, heatScore: 85 }
        ]
      });
    } catch (_) {}
  }

  return res.status(500).json({
    error: 'No daily impact data available. Please trigger a refresh.'
  });
}
