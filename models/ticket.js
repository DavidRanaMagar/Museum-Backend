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
        purchaseDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        eventDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        timeSlot: {
            type: DataTypes.TIME,
            allowNull: false
        },
        ticketStatus: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exhibitionID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        createdBy: {
            type: DataTypes.STRING(25),
            defaultValue: 'online user',
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
        updatedBy: {
            type: DataTypes.STRING(25),
            defaultValue: 'online user',
            allowNull: false
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
        Ticket.belongsTo(models.Customer, {
            foreignKey: 'customerID',
            as: 'customer'
        });
        Ticket.belongsTo(models.Exhibition, {
            foreignKey: 'exhibitionID',
            as: 'exhibition'
        });
    };

    return Ticket;
};
