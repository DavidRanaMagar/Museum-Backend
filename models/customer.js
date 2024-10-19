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
        creditCardNumber: {
            type: DataTypes.STRING(16), 
            allowNull: false
        },
        expiryDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        cvv: {
            type: DataTypes.STRING(3), // Typically 3 digits
            allowNull: false
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
        address: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Address', // Name of the referenced model
                key: 'addressID' // Key in the referenced model
            }
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
        Customer.belongsTo(models.Address, {
            foreignKey: 'address',
            as: 'customerAddress'
        });
    };

    return Customer;
};
