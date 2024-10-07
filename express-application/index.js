const dbConfig = require("./src/configs/db.configs");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'postgres',
    operatorAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Mengimpor semua model

db.Customer = require("./src/models/customer.model")(sequelize, Sequelize);
db.Food = require("./src/models/food.model")(sequelize, Sequelize);
db.Transaction = require("./src/models/transaction.model")(sequelize, Sequelize);

// Mengatur asosiasi jika diperlukan
db.Transaction.associate(db);

module.exports = db;