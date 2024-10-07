module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define('Food', {
        food_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        food_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'foods',
        timestamps: false
    });

    return Food;
};
