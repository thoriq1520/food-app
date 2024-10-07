const db = require("../../index");
const Food = db.Food;
const Op = db.Sequelize.Op;
const { Response, Pagination } = require("../models/response.model"); 

// Create and Save a new Food
exports.create = (req, res) => {
  // Validate request
  if (!req.body.food_name || !req.body.price || !req.body.stock) {
    return res.status(400).json(new Response(400, "Content cannot be empty!", null));
  }

  // Create a Food item
  const food = {
    food_name: req.body.food_name,
    price: req.body.price,
    stock: req.body.stock
  };

  // Save Food in the database
  Food.create(food)
    .then(data => {
      res.status(201).json(new Response(201, "Food created successfully.", data));
    })
    .catch(err => {
      res.status(500).json(new Response(500, err.message || "Some error occurred while creating the Food.", null));
    });
};

// Retrieve all Foods from the database with pagination
exports.findAll = async (req, res) => {
    const keyword = req.query.keyword;
    const limit = parseInt(req.query.limit) || 10; 
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
  
    let condition = keyword ? { food_name: { [Op.iLike]: `%${keyword}%` } } : null;
  
    try {
      const { count: total, rows: data } = await Food.findAndCountAll({
        where: condition,
        limit: limit,
        offset: offset
      });
  
      const pagination = new Pagination(total, limit, page);
      res.status(200).json(new Response(200, "Foods retrieved successfully.", data, pagination));
    } catch (err) {
      res.status(500).json(new Response(500, err.message || "Some error occurred while retrieving foods.", null));
    }
  };

// Find a single Food with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Food.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json(new Response(200, "Food retrieved successfully.", data));
      } else {
        res.status(404).json(new Response(404, `Cannot find Food with id=${id}.`, null));
      }
    })
    .catch(err => {
      res.status(500).json(new Response(500, "Error retrieving Food with id=" + id, null));
    });
};

// Update a Food by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Food.update(req.body, {
    where: { food_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json(new Response(200, "Food was updated successfully.", null));
      } else {
        res.status(404).json(new Response(404, `Cannot update Food with id=${id}. Maybe Food was not found or req.body is empty!`, null));
      }
    })
    .catch(err => {
      res.status(500).json(new Response(500, "Error updating Food with id=" + id, null));
    });
};

// Delete a Food with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Food.destroy({
    where: { food_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json(new Response(200, "Food was deleted successfully!", null));
      } else {
        res.status(404).json(new Response(404, `Cannot delete Food with id=${id}. Maybe Food was not found!`, null));
      }
    })
    .catch(err => {
      res.status(500).json(new Response(500, "Could not delete Food with id=" + id, null));
    });
};

// Delete all Foods from the database
exports.deleteAll = (req, res) => {
  Food.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.status(200).json(new Response(200, `${nums} Foods were deleted successfully!`, null));
    })
    .catch(err => {
      res.status(500).json(new Response(500, err.message || "Some error occurred while removing all foods.", null));
    });
};