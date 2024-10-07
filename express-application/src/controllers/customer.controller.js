const db = require("../../index");
const Customer = db.Customer;
const Op = db.Sequelize.Op;
const { Response, Pagination } = require("../models/response.model"); // Adjust the path as necessary

// Create and Save a new Customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).json(new Response(400, "Content cannot be empty!", null));
  }

  // Create a Customer
  const customer = {
    name: req.body.name,
    phone: req.body.phone || null,
    address: req.body.address || null,
  };

  // Save Customer in the database
  Customer.create(customer)
    .then((data) => {
      res.status(201).json(new Response(201, "Customer created successfully.", data));
    })
    .catch((err) => {
      res.status(500).json(new Response(500, err.message || "Some error occurred while creating the Customer.", null));
    });
};

// Retrieve all Customers from the database
exports.findAll = (req, res) => {
  const keyword = req.query.keyword; 
  const limit = parseInt(req.query.limit) || 10; 
  const page = parseInt(req.query.page) || 1; 
  const offset = (page - 1) * limit; 

  let condition = keyword ? { name: { [Op.iLike]: `%${keyword}%` } } : null; 

  Customer.findAndCountAll({ where: condition, limit, offset }) 
    .then(result => {
      const pagination = new Pagination(result.count, limit, page);
      res.status(200).json(new Response(200, "Customers retrieved successfully.", result.rows, pagination));
    })
    .catch((err) => {
      res.status(500).json(new Response(500, err.message || "Some error occurred while retrieving customers.", null));
    });
};

// Find a single Customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Customer.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).json(new Response(200, "Customer retrieved successfully.", data));
      } else {
        res.status(404).json(new Response(404, `Cannot find Customer with id=${id}.`, null));
      }
    })
    .catch((err) => {
      res.status(500).json(new Response(500, "Error retrieving Customer with id=" + id, null));
    });
};

// Update a Customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { customer_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json(new Response(200, "Customer was updated successfully.", null));
      } else {
        res.status(404).json(new Response(404, `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`, null));
      }
    })
    .catch((err) => {
      res.status(500).json(new Response(500, "Error updating Customer with id=" + id, null));
    });
};

// Delete a Customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { customer_id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).json(new Response(200, "Customer was deleted successfully!", null));
      } else {
        res.status(404).json(new Response(404, `Cannot delete Customer with id=${id}. Maybe Customer was not found!`, null));
      }
    })
    .catch((err) => {
      res.status(500).json(new Response(500, "Could not delete Customer with id=" + id, null));
    });
};

// Delete all Customers from the database
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(200).json(new Response(200, `${nums} Customers were deleted successfully!`, null));
    })
    .catch((err) => {
      res.status(500).json(new Response(500, err.message || "Some error occurred while removing all customers.", null));
    });
};
