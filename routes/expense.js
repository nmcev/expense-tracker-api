const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth')
const expenseController = require('../controllers/expenseController');

// GET, get all expenses with all filters
router.get('/', authenticateToken, expenseController.getExpenses);

// GET, get single expense
router.get('/:id', authenticateToken, expenseController.getSingleExpense);

// PATCH, update expense
router.patch('/:id', authenticateToken, expenseController.updateExpense);

// DELETE, delete expense
router.delete('/:id', authenticateToken, expenseController.deleteExpense);

// POST, add new expense: 
router.post('/', authenticateToken, expenseController.createNewExpense);

module.exports = router;