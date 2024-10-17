'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    transactionID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer', // Referencing the Customer model
        key: 'customerID'
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
    tableName: 'transaction',
    timestamps: false
  });

  // Associations
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Customer, {
      foreignKey: 'customerID',
      as: 'customerDetails'
    });
  };

  return Transaction;
};
