'use strict';
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
        addressID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true
        },
        streetAddress: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        state: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        postalCode: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'address',
        timestamps: false
    });

    Address.associate = function (models) {
        // associations can be defined here
        Address.hasMany(models.Customer, {
            foreignKey: 'addressID',
            as: 'customers'
        });
        Address.hasMany(models.Employee, {
            foreignKey: 'address',
            as: 'employees'
        });
        // Add other associations if necessary
    };

    return Address;
};
