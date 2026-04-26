const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = [
    "Food", "Transport", "Entertainment", "Education",
    "Clothing", "Health", "Bills", "Gifts",
    "Housing", "Personal Care", "Groceries", "Others"
]

const expenseSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    currency: { type: Number },
    Category: { type: String, enum: categories },
    description: { type: String },
    date: { type: Date },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Expense", expenseSchema);
