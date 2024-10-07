module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('Transaction', {
        transaction_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'customers',
                key: 'customer_id'
            }
        },
        food_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'foods',
                key: 'food_id'
            }
        },
        qty: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        total_price: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        transaction_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }, {
        tableName: 'transactions',
        timestamps: false
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.Customer, { foreignKey: 'customer_id' });
        Transaction.belongsTo(models.Food, { foreignKey: 'food_id' });
    };

    Transaction.prototype.toResponse = function() {
        return {
            transaction_id: this.transaction_id,
            qty: this.qty,
            total_price: this.total_price,
            transaction_date: this.transaction_date,
            customer: {
                customer_id: this.Customer.customer_id,
                name: this.Customer.name
            },
            food: {
                food_id: this.Food.food_id,
                food_name: this.Food.food_name
            }
        };
    };

    return Transaction;
};