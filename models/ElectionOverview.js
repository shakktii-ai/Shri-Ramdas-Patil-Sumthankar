import mongoose from 'mongoose';

const ElectionOverviewSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      default: 'nanded-pc',
      unique: true,
      index: true,
    },
    title: {
      type: String,
      default: 'Nanded Parliamentary Constituency Overview',
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      default: 'Nanded PC Overview.pdf',
    },
    constituencyMeta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    casteDemographics: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    economicProfile: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    issuesAndDemands: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    assemblyConstituencies: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    ge2024ResultAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    strategicActionables: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    pcElectoralHistory: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    partyStandings: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ElectionOverview || mongoose.model('ElectionOverview', ElectionOverviewSchema);
