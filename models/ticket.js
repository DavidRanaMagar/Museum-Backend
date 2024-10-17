'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    ticketID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ticketType: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    purchaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    timeSlot: {
      type: DataTypes.TIME,
      allowNull: true
    },
    ticketStatus: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    createdBy: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    },
    updatedBy: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    tableName: 'ticket',
    timestamps: false
  });

  // Associations
  Ticket.associate = (models) => {
    Ticket.belongsTo(models.TicketType, {
      foreignKey: 'ticketType',
      as: 'ticketTypeDetails'
    });
    Ticket.belongsTo(models.TicketStatus, {
      foreignKey: 'ticketStatus',
      as: 'ticketStatusDetails'
    });
  };

  return Ticket;
};
