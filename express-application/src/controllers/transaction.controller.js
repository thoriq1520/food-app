const db = require("../../index");
const Transaction = db.Transaction;
const Customer = db.Customer; // Make sure to import Customer
const Food = db.Food; // Make sure to import Food
const Op = db.Sequelize.Op;
const { Response, Pagination } = require("../models/response.model");

exports.create = (req, res) => {
    if (!req.body.customer_id || !req.body.food_id || !req.body.qty || !req.body.transaction_date) {
      return res.status(400).send(new Response(400, "Content cannot be empty!", null, null));
    }
  
    const transaction = {
      customer_id: req.body.customer_id,
      food_id: req.body.food_id,
      qty: req.body.qty,
      total_price: req.body.total_price,
      transaction_date: req.body.transaction_date
    };
  
    Transaction.create(transaction)
      .then(data => {
        res.status(201).send(new Response(201, "Transaction created successfully.", data, null));
      })
      .catch(err => {
        res.status(500).send(new Response(500, err.message || "Some error occurred while creating the Transaction.", null, null));
      });
  };
  
  exports.findAll = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1; 
    const offset = (page - 1) * limit; 

    try {
        const { count: total, rows: transactions } = await Transaction.findAndCountAll({
            limit: limit,
            offset: offset,
            include: [
                {
                    model: Customer,
                    attributes: ['customer_id', 'name'], 
                },
                {
                    model: Food,
                    attributes: ['food_id', 'food_name'], 
                },
            ],
        });

        const transformedTransactions = transactions.map(transaction => transaction.toResponse());

        const pagination = new Pagination(total, limit, page);
        res.status(200).json(new Response(200, "Transactions retrieved successfully.", transformedTransactions, pagination));
    } catch (err) {
        res.status(500).json(new Response(500, err.message || "Some error occurred while retrieving transactions.", null));
    }
};


// Find a single Transaction with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const transaction = await Transaction.findByPk(id, {
            include: [
                {
                    model: Customer,
                    attributes: ['customer_id', 'name'],
                },
                {
                    model: Food,
                    attributes: ['food_id', 'food_name'],
                },
            ],
        });

        if (transaction) {
            const transformedTransaction = transaction.toResponse();
            res.status(200).json(new Response(200, "Transaction retrieved successfully.", transformedTransaction));
        } else {
            res.status(404).json(new Response(404, `Cannot find Transaction with id=${id}.`, null));
        }
    } catch (err) {
        res.status(500).json(new Response(500, "Error retrieving Transaction with id=" + id, null));
    }
};
  
  // Update a Transaction by the id in the request
  exports.update = (req, res) => {
    const id = req.params.id;
  
    Transaction.update(req.body, {
      where: { transaction_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send(new Response(200, "Transaction was updated successfully.", null, null));
        } else {
          res.status(404).send(new Response(404, `Cannot update Transaction with id=${id}. Maybe Transaction was not found or req.body is empty!`, null, null));
        }
      })
      .catch(err => {
        res.status(500).send(new Response(500, "Error updating Transaction with id=" + id, null, null));
      });
  };
  
  // Delete a Transaction with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Transaction.destroy({
      where: { transaction_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).send(new Response(200, "Transaction was deleted successfully!", null, null));
        } else {
          res.status(404).send(new Response(404, `Cannot delete Transaction with id=${id}. Maybe Transaction was not found!`, null, null));
        }
      })
      .catch(err => {
        res.status(500).send(new Response(500, "Could not delete Transaction with id=" + id, null, null));
      });
  };
  
  // Delete all Transactions from the database
  exports.deleteAll = (req, res) => {
    Transaction.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.status(200).send(new Response(200, `${nums} Transactions were deleted successfully!`, null, null));
      })
      .catch(err => {
        res.status(500).send(new Response(500, err.message || "Some error occurred while removing all transactions.", null, null));
      });
  };