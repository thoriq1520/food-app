const express = require('express');
const router = express.Router();
const transactions = require('../controllers/transaction.controller');

router.post('/', transactions.create);

router.get('/', transactions.findAll);

router.get('/:id', transactions.findOne);

router.put('/:id', transactions.update);

router.delete('/:id', transactions.delete);

router.delete('/', transactions.deleteAll);

module.exports = router;
