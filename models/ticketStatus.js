'use strict';
module.exports = (sequelize, DataTypes) => {
    const TicketStatus = sequelize.define('TicketStatus', {
        ticketStatusCode: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true
        },
        ticketStatus: {
            type: DataTypes.STRING(10),
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
        }
    }, {
        tableName: 'ticket_status',
        timestamps: false
    });

    return TicketStatus;
};
