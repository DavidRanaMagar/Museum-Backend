'use strict';
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        customerID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        sex: {
            type: DataTypes.TINYINT,
            allowNull: true,
            references: {
                model: 'Sex', // Name of the referenced model
                key: 'sexCode' // Key in the referenced model
            }
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references:{
                model: 'User',
                key: 'userID'
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
        tableName: 'customer',
        timestamps: false
    });

    Customer.associate = function (models) {
        // associations can be defined here
        Customer.belongsTo(models.Sex, {
            foreignKey: 'sex',
            as: 'gender'
        });
        Customer.belongsTo(models.User, {
            foreignKey: 'userID',
        });
    };

    return Customer;
};