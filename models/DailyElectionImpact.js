import mongoose from 'mongoose';

const DailyElectionImpactSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      index: true,
    },
    analyzedAt: {
      type: String,
    },
    totalSignalsProcessed: {
      type: Number,
      default: 0,
    },
    overallSentiment: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    topBuzzTopics: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    acImpactScorecard: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    socialMediaPulse: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    curatedTopHeadlines: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    strategicLeadershipDirective: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    apiCallsBudgetUsed: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.DailyElectionImpact || mongoose.model('DailyElectionImpact', DailyElectionImpactSchema);
