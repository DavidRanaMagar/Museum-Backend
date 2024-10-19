'use strict';
module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
        saleID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: true
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
        },
        employeeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Employee', // Name of the referenced model
                key: 'employeeID'  // Key in the referenced model
            }
        }
    }, {
        tableName: 'sale',
        timestamps: false
    });

    Sale.associate = function (models) {
        // associations can be defined here
        Sale.belongsTo(models.Employee, {
            foreignKey: 'employeeID',
            as: 'employee'
        });
    };

    return Sale;
};
