const Income = require('../models/Income')
const Expense = require('../models/Expense')
const { model } = require("../services/geminiService.js");
const { buildFinancialSummary } = require("../utils/buildFinancialSummary.js");
 
exports.getAIInsights = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const incomes = await Income.find({
      userId,
    });

    const expenses = await Expense.find({
      userId,
    });

    const financialSummary =
      buildFinancialSummary(
        incomes,
        expenses
      );

    const prompt = `
Analyze this financial summary.

${JSON.stringify(financialSummary)}

Return ONLY JSON.

{
  "summary":"",
  "topCategory":"",
  "recommendations":[],
  "warnings":[]
}
`;

    const result =
      await model.generateContent(
        prompt
      );

    let response =
      result.response.text();

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "");

    const parsed =
      JSON.parse(response);

    res.status(200).json(parsed);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message:
        "Failed to generate insights",
    });
  }
};