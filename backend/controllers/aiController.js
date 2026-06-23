const crypto = require("crypto");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const AIInsights = require("../models/AI_Insights");
const groq = require("../services/groqService");
const { buildFinancialSummary } = require("../utils/buildFinancialSummary");

const hashSummary = (summary) =>
  crypto.createHash("sha256").update(JSON.stringify(summary)).digest("hex");

const fetchInsightsFromGroq = async (financialSummary) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "You are a financial advisor. Respond only with valid JSON.",
      },
      {
        role: "user",
        content: `
Analyze:

${JSON.stringify(financialSummary)}

Return JSON:

{
  "summary": "",
  "topCategory": "",
  "spendingTrend": "",
  "savingsOpportunity": "",
  "riskScore": 0,
  "budgetSuggestion": "",
  "prediction": "",
  "recommendations": [],
  "warnings": []
}
`,
      },
    ],
    temperature: 0.7,
  });

  let raw = completion.choices[0].message.content;
  raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(raw);
};


exports.getAIInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    const [incomes, expenses] = await Promise.all([
      Income.find({ userId }),
      Expense.find({ userId }),
    ]);

    const financialSummary = buildFinancialSummary(incomes, expenses);
    const currentHash = hashSummary(financialSummary);

    
    const cached = await AIInsights.findOne({ userId });
    if (cached && cached.dataHash === currentHash) {
      
      return res.status(200).json(cached.toObject());
    }

    
    const parsed = await fetchInsightsFromGroq(financialSummary);

    
    await AIInsights.findOneAndUpdate(
      { userId },
      { ...parsed, dataHash: currentHash },
      { upsert: true, new: true }
    );

    res.status(200).json(parsed);
  } catch (err) {
    console.error("AI Insights error:", err);
    res.status(500).json({ message: err.message });
  }
};


exports.invalidateAIInsights = async (userId) => {
  try {
    await AIInsights.findOneAndUpdate(
      { userId },
      { dataHash: null } 
    );
  } catch (err) {
    console.error("Failed to invalidate AI insights cache:", err);
    
  }
};