const mongoose = require("mongoose");

const AIInsightsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    summary: { type: String },
    topCategory: { type: String },
    spendingTrend: { type: String },
    savingsOpportunity: { type: String },
    riskScore: { type: Number },
    budgetSuggestion: { type: String },
    prediction: { type: String },
    recommendations: [{ type: String }],
    warnings: [{ type: String }],
    dataHash: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIInsights", AIInsightsSchema);