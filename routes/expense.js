const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth')
const expenseController = require('../controllers/expenseController');

// GET, get all expenses with all filters
router.get('/', authenticateToken, expenseController.getExpenses);

// GET, get single expense
router.get('/:id', authenticateToken, expenseController.getSingleExpense);

// PATCH, update expense
router.patch('/:id',authenticateToken ,expenseController.updateExpense);

// POST, add new expense: 
router.post('/new', authenticateToken, expenseController.createNewExpense);

module.exports = router;