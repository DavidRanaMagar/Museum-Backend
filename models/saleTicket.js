'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleTicket = sequelize.define('SaleTicket', {
    saleID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Sale', // Referencing the Sale model
        key: 'saleID'
      }
    },
    ticketID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Ticket', // Referencing the Ticket model
        key: 'ticketID'
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
    tableName: 'sale_ticket',
    timestamps: false
  });

  // Associations
  SaleTicket.associate = (models) => {
    SaleTicket.belongsTo(models.Sale, {
      foreignKey: 'saleID',
      as: 'saleDetails'
    });
    SaleTicket.belongsTo(models.Ticket, {
      foreignKey: 'ticketID',
      as: 'ticketDetails'
    });
  };

  return SaleTicket;
};
