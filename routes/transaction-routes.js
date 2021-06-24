const express = require('express');
const { addTransaction,
    getAllTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');

const router = express.Router();

router.post('/transaction', addTransaction);
router.get('/allTransactions', getAllTransactions);
router.get('/transaction/:transactionId', getTransaction);
router.put('/transaction/:transactionId', updateTransaction);
router.delete('/transaction/:transactionId', deleteTransaction);


module.exports = {
    routes: router
}