'use strict';
module.exports = (sequelize, DataTypes) => {
    const SaleTransaction = sequelize.define('SaleTransaction', {
        transactionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Customer', // Name of the referenced model
                key: 'customerID'  // Key in the referenced model
            }
        },
        transactionAmount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        paymentMethod: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        transactionDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        saleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Sale', // Name of the referenced model
                key: 'saleID'  // Key in the referenced model
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        createdBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
        updatedBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        }
    }, {
        tableName: 'sale_transaction',
        timestamps: false
    });

    SaleTransaction.associate = function (models) {
        // associations can be defined here
        SaleTransaction.belongsTo(models.Customer, {
            foreignKey: 'customerID',
            as: 'customer'
        });
        SaleTransaction.belongsTo(models.Sale, {
            foreignKey: 'saleID',
            as: 'sale'
        });
    };

    return SaleTransaction;
};
