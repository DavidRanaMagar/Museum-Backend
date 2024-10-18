'use strict';
module.exports = (sequelize, DataTypes) => {
    const TicketType = sequelize.define('TicketType', {
        ticketTypeCode: {
            type: DataTypes.TINYINT,
            allowNull: false,
            primaryKey: true
        },
        ticketType: {
            type: DataTypes.STRING(20),
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
        tableName: 'ticket_type',
        timestamps: false
    });

    return TicketType;
};
