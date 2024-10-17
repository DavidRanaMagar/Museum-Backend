
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    addressID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    streetAddress: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    postalCode: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'address',
    timestamps: false
  });

  Address.associate = function(models) {
    // associations can be defined here
    Address.hasMany(models.Customer, {
      foreignKey: 'address',
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
