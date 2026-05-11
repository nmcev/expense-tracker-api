const Expense = require('../models/Expense');
const { body, validationResult } = require('express-validator');


module.exports = {

    createNewExpense: [
        body('amount').isNumeric().withMessage('Amount must be a numeric value'),
        body('currency').trim().isString().withMessage('Currency must be a string value '),
        body('description').trim().isString().withMessage('Description must be a string value'),
        body('category').trim().isString().withMessage('Category must be a string value'),
        body('date').trim().isDate().withMessage('Date must be in a Date format'),

        async function (req, res, next) {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const { userId } = req.user

            let { amount, currency, category, description, date } = req.body;

            category = category.toLowerCase();
            currency = currency.toLowerCase();

            try {

                const newExpense = new Expense({
                    user: userId,
                    amount,
                    currency,
                    category,
                    description,
                    date,
                });

                await newExpense.save();

                res.status(200).json({
                    message: 'Expense created successfully!',
                    expense: newExpense

                })

            } catch (e) {
                next(e)
            }
        }
    ],

    getExpenses: [
        async function (req, res, next) {
            const userId = req.user.userId;
            let allExpenses;


            const { month, year, category, currency, from, to } = req.query;

            try {

                if (Object.keys(req.query).length === 0) {
                    allExpenses = await Expense.find({ user: userId });
                    return res.json({ allExpenses });
                }


                const filter = { user: userId };
                if (category) {
                    filter.category = category
                }

                if (currency) {
                    filter.currency = currency;
                }

                if (month && year) {
                    const startDate = new Date(year, month - 1, 1);
                    const endDate = new Date(year, month, 0, 23, 59, 59);

                    filter.date = { $gte: startDate, $lte: endDate }
                }

                if (from && to) {
                    filter.date = { $gte: from, $lte: to }


                }

                allExpenses = await Expense.find(filter);
                res.json(allExpenses)
            }
            catch (e) {
                next(e)
            }
        }
    ],

    getSingleExpense: [

        async function (req, res, next) {

            const expenseId = req.params.id;


            if (!expenseId) return res.status(404).json({ message: "No Id found!" });

            try {

                const expense = await Expense.findOne({ _id: expenseId });

                if (expense == null) return res.status(404).json({ message: "Expense Not Found" });

                if (expense.user.toString() !== req.user.userId) {
                    return res.status(403).json({ message: "Access Denied" });
                }


                res.json({
                    expense
                })

            } catch (e) {
                next(e)
            }
        }
    ],

    updateExpense: [
        body('amount').isNumeric().optional(),
        body('currency').isString().optional(),
        body('category').isString().optional(),
        body('description').isString().optional(),
        body('date').isDate().optional(),

        async function (req, res, next) {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const expenseId = req.params.id;

            if (!expenseId) {
                return res.status(400).json({ message: "Expense ID Not Found" })
            }

            try {

                const expense = await Expense.findOne({ _id: expenseId });

                if (!expense) {
                    return res.status(404).json({ message: "Expense Not Found" })
                }

                if (expense.user.toString() !== req.user.userId) {
                    return res.status(403).json({ message: "Authorization Access Denied" })
                }

                if (!req.body || Object.keys(req.body).length === 0) {
                    return res.status(400).json({ message: "Empty request body" });
                }

                const { amount, currency, category, description, date } = req.body;


                if (amount !== undefined) {
                    expense.amount = amount;
                }

                if (currency !== undefined) {
                    expense.currency = currency;
                }

                if (category !== undefined) {
                    expense.category = category;
                }

                if (description !== undefined) {
                    expense.description = description;
                }

                if (date !== undefined) {
                    expense.date = date;
                }


                await expense.save();

                res.json({
                    message: "Expense Updated",
                    expense
                })
            }
            catch (e) {
                next(e);
            }

        }
    ],

    deleteExpense: [
        async function (req, res, next) {

            const expenseId = req.params.id;

            if (!expenseId) return res.status(404).json({ message: "No Id found!" });

            try {

                const expense = await Expense.findOne({ _id: expenseId });

                if (expense == null) return res.status(404).json({ message: "Expense Not Found" });

                if (expense.user.toString() !== req.user.userId) {
                    return res.status(403).json({ message: "Access Denied" });
                }


                await expense.deleteOne();

                res.json({
                    message: "Expense deleted successfully!"
                })

            } catch (e) {
                next(e)
            }

        }
    ]
}

