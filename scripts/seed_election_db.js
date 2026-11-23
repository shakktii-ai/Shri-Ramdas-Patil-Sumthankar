const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/^MONGO_URI=([^\r\n]+)/m);
  if (match) {
    process.env.MONGO_URI = match[1].trim();
  }
}

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is missing!');
  process.exit(1);
}

// Schemas
const ElectionOverviewSchema = new mongoose.Schema(
  {
    slug: { type: String, default: 'nanded-pc', unique: true, index: true },
    title: { type: String, default: 'Nanded Parliamentary Constituency Overview' },
    lastUpdated: { type: Date, default: Date.now },
    source: { type: String, default: 'Nanded PC Overview.pdf' },
    constituencyMeta: mongoose.Schema.Types.Mixed,
    casteDemographics: mongoose.Schema.Types.Mixed,
    economicProfile: mongoose.Schema.Types.Mixed,
    issuesAndDemands: mongoose.Schema.Types.Mixed,
    assemblyConstituencies: mongoose.Schema.Types.Mixed,
    ge2024ResultAnalysis: mongoose.Schema.Types.Mixed,
    strategicActionables: mongoose.Schema.Types.Mixed,
    pcElectoralHistory: mongoose.Schema.Types.Mixed,
    partyStandings: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const DailyElectionImpactSchema = new mongoose.Schema(
  {
    date: { type: String, required: true, index: true },
    analyzedAt: String,
    totalSignalsProcessed: { type: Number, default: 0 },
    overallSentiment: mongoose.Schema.Types.Mixed,
    topBuzzTopics: mongoose.Schema.Types.Mixed,
    acImpactScorecard: mongoose.Schema.Types.Mixed,
    socialMediaPulse: mongoose.Schema.Types.Mixed,
    curatedTopHeadlines: mongoose.Schema.Types.Mixed,
    strategicLeadershipDirective: mongoose.Schema.Types.Mixed,
    apiCallsBudgetUsed: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

const ElectionOverview = mongoose.models.ElectionOverview || mongoose.model('ElectionOverview', ElectionOverviewSchema);
const DailyElectionImpact = mongoose.models.DailyElectionImpact || mongoose.model('DailyElectionImpact', DailyElectionImpactSchema);

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 15000 });
  console.log('Connected successfully to MongoDB Atlas database:', mongoose.connection.name);

  // 1. Seed Election Overview (PDF Data)
  const overviewPath = path.join(__dirname, '..', 'lib', 'electionData', 'nandedOverview.json');
  if (fs.existsSync(overviewPath)) {
    const overviewData = JSON.parse(fs.readFileSync(overviewPath, 'utf8'));
    console.log('Found nandedOverview.json. Upserting into electionoverviews collection...');
    
    const doc = await ElectionOverview.findOneAndUpdate(
      { slug: 'nanded-pc' },
      {
        slug: 'nanded-pc',
        title: 'Nanded Parliamentary Constituency Overview - Lok Sabha',
        source: 'Nanded PC Overview.pdf',
        lastUpdated: new Date(),
        constituencyMeta: overviewData.constituencyMeta,
        casteDemographics: overviewData.casteDemographics,
        economicProfile: overviewData.economicProfile,
        issuesAndDemands: overviewData.issuesAndDemands,
        assemblyConstituencies: overviewData.assemblyConstituencies,
        ge2024ResultAnalysis: overviewData.ge2024ResultAnalysis,
        strategicActionables: overviewData.strategicActionables,
        pcElectoralHistory: overviewData.pcElectoralHistory,
        partyStandings: overviewData.partyStandings,
      },
      { upsert: true, new: true }
    );
    console.log('Successfully saved ElectionOverview in MongoDB! Document ID:', doc._id);
    console.log('Caste Demographics Count:', doc.casteDemographics?.length);
    console.log('Issues & Demands Count:', doc.issuesAndDemands?.length);
    console.log('Assembly Constituencies Count:', doc.assemblyConstituencies?.length);
  } else {
    console.warn('Overview file not found at', overviewPath);
  }

  // 2. Seed Daily Election Impact (News & Social Media signals)
  const dailyPath = path.join(__dirname, '..', 'lib', 'electionData', 'nandedDailyImpact.json');
  if (fs.existsSync(dailyPath)) {
    const dailyData = JSON.parse(fs.readFileSync(dailyPath, 'utf8'));
    console.log('Found nandedDailyImpact.json. Upserting into dailyelectionimpacts collection...');
    
    const dateStr = '2026-11-24';
    const docDaily = await DailyElectionImpact.findOneAndUpdate(
      { date: dateStr },
      {
        date: dateStr,
        analyzedAt: dailyData.analyzedAt || new Date().toISOString(),
        totalSignalsProcessed: dailyData.totalSignalsProcessed || 24,
        overallSentiment: dailyData.overallSentiment,
        topBuzzTopics: dailyData.topBuzzTopics,
        acImpactScorecard: dailyData.acImpactScorecard,
        socialMediaPulse: dailyData.socialMediaPulse,
        curatedTopHeadlines: dailyData.curatedTopHeadlines,
        strategicLeadershipDirective: dailyData.strategicLeadershipDirective,
        apiCallsBudgetUsed: dailyData.apiCallsBudgetUsed,
      },
      { upsert: true, new: true }
    );
    console.log('Successfully saved DailyElectionImpact in MongoDB! Document ID:', docDaily._id);
    console.log('Social Media Signals Count:', docDaily.socialMediaPulse?.socialSignals?.length);
    console.log('Platforms Covered:', Object.keys(docDaily.socialMediaPulse?.platformBreakdown || {}));
    console.log('Curated Headlines Count:', docDaily.curatedTopHeadlines?.length);
  } else {
    console.warn('Daily impact file not found at', dailyPath);
  }

  console.log('MongoDB Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
