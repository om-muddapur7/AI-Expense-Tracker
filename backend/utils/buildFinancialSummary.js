exports.buildFinancialSummary = (
  incomes,
  expenses
) => {
  const totalIncome = incomes.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const totalExpense = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const categoryMap = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) +
      expense.amount;
  });

  return {
    totalIncome,
    totalExpense,
    savings:
      totalIncome - totalExpense,
    categories: categoryMap,
  };
};