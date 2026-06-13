const Income = require('../models/Income')
const Expense = require('../models/Expense')
const {isValidObjectId, Types} = require('mongoose')

exports.getDashboardData = async(req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        //total income
        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);

        console.log("Total income: ", {totalIncome, userId: isValidObjectId(userId)});

        //total expense
        const totalExpense = await Expense.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}}
        ]);
        
        //last 30 days income transactions
        const last30daysIncomeTransactions = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)}
        }).sort({date: -1});

        //total income last 30 days
        const incomeLast30days = last30daysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //last 30 days expense transactions
        const last30daysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)}
        }).sort({date: -1});

        //total expense last 30 days
        const expenseLast30days = last30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //fetch last 5 transactions
        const lastTransactions = [
            ...(await Income.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income"
                })
            ),

            ...(await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense"
                })
            )
        ].sort((a,b) => b.date - a.date);

        //final response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0 ) - (totalExpense[0]?.total || 0 ),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0 ,
            last30daysExpenses: {
                total: expenseLast30days,
                transactions: last30daysExpenseTransactions
            },
            last30daysIncomes: {
                total: incomeLast30days,
                transactions: last30daysIncomeTransactions
            },
            recentTransactions: lastTransactions
        });


    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error
        })
    }
}