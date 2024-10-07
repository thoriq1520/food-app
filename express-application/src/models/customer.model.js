module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define('Customer', {
        customer_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, {
        tableName: 'customers',
        timestamps: false
    });

    return Customer;
};
