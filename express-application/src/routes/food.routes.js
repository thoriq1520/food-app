const express = require('express');
const router = express.Router();
const foods = require('../controllers/food.controller');

router.post('/', foods.create);

router.get('/', foods.findAll);

router.get('/:id', foods.findOne);

router.put('/:id', foods.update);

router.delete('/:id', foods.delete);

router.delete('/', foods.deleteAll);

module.exports = router;
