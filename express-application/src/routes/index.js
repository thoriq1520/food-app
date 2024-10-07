const express = require('express');
const router = express.Router();

const customerRoutes = require('./customer.routes');
const foodRoutes = require('./food.routes');
const transactionRoutes = require('./transaction.routes');

router.use('/customers', customerRoutes);

router.use('/foods', foodRoutes);

router.use('/transactions', transactionRoutes);

module.exports = router;
