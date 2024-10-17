'use strict';
module.exports = (sequelize, DataTypes) => {
  const Donation = sequelize.define('Donation', {
    donationID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customer', // Referencing the Customer model
        key: 'customerID'
      }
    },
    transactionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Transaction', // Referencing the Transaction model
        key: 'transactionID'
      }
    },
    donation: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    donationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    createdBy: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    },
    updatedBy: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, {
    tableName: 'donation',
    timestamps: false
  });

  // Associations
  Donation.associate = (models) => {
    Donation.belongsTo(models.Customer, {
      foreignKey: 'customerID',
      as: 'customerDetails'
    });
    Donation.belongsTo(models.Transaction, {
      foreignKey: 'transactionID',
      as: 'transactionDetails'
    });
  };

  return Donation;
};
