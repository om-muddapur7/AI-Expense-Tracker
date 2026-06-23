const Income = require("../models/Income");
const Expense = require("../models/Expense");
 
const groq = require("../services/groqService");

const { buildFinancialSummary } = require("../utils/buildFinancialSummary");

exports.getAIInsights = async (req, res) => {
	try {
		const userId = req.user._id;

		const incomes = await Income.find({
			userId,
		});

		const expenses = await Expense.find({
			userId,
		});

		const financialSummary = buildFinancialSummary(incomes, expenses);

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
  "summary":"",
  "topCategory":"",
  "spendingTrend":"",
  "savingsOpportunity":"",
  "riskScore":"",
  "budgetSuggestion":"",
  "prediction":"",
  "recommendations":[],
  "warnings":[]
}
`,
				},
			],

			temperature: 0.7,
		});

		let response = completion.choices[0].message.content;

		response = response
			.replace(/```json/g, "")
			.replace(/```/g, "")
			.trim();

		const parsed = JSON.parse(response);

		res.status(200).json(parsed);
	} catch (err) {
		console.log(err);

		res.status(500).json({
			message: err.message,
		});
	}
};
