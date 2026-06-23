exports.buildFinancialSummary = (
	incomes,
	expenses
) => { 
	const totalIncome = incomes.reduce(
		(sum, item) => sum + item.amount,
		0
	);

	const totalExpense = expenses.reduce(
		(sum, item) => sum + item.amount,
		0
	);

	const categories = {};

	expenses.forEach((expense) => {
		categories[expense.category] =
			(categories[expense.category] || 0) +
			expense.amount;
	});

	return {
		totalIncome,
		totalExpense,
		savings: totalIncome - totalExpense,
		categories,
	};
};