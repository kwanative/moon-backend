'use strict';

const firebase = require('../db');
const Transaction = require('../models/transaction');
const firestore = firebase.firestore();


const addTransaction = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('transactions').doc(req.body.transactionId).set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTransactions = async (req, res, next) => {
    try {
        const transactions = await firestore.collection('transactions');
        const data = await transactions.get();
        const transactionArray = [];
        if(data.empty) {
            res.status(404).send('No transaction record found');
        }else {
            data.forEach(doc => {
                const transaction = new Transaction(
                    doc.data().transactionId,
                    doc.data().dateTime,
                    doc.data().thbtAmount,
                    doc.data().moonAmount,
                    doc.data().rate
                );
                transactionArray.push(transaction);
            });
            res.send(transactionArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTransaction = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        const transaction = await firestore.collection('transactions').doc(transactionId);
        const data = await transaction.get();
        if(!data.exists) {
            res.status(404).send('Transaction with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTransaction = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        const data = req.body;
        const transaction =  await firestore.collection('transactions').doc(transactionId);
        await transaction.update(data);
        res.send('Transaction updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTransaction = async (req, res, next) => {
    try {
        const transactionId = req.params.transactionId;
        await firestore.collection('transactions').doc(id).delete();
        res.send('Transaction deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTransaction,
    getAllTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
}