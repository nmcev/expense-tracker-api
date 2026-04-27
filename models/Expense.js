const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = [
    "food", "transport", "entertainment", "education",
    "clothing", "health", "bills", "gifts",
    "housing", "personal care", "groceries", "others"
]

const expenseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, enum: ['idq', 'usd', 'eur'] },
    category: { type: String, enum: categories },
    description: { type: String },
    date: { type: Date },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Expense", expenseSchema);
