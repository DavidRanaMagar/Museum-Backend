'use strict';
module.exports = (sequelize, DataTypes) => {
    const MembershipExpiryNotification = sequelize.define('MembershipExpiryNotification', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        customerID: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'customer',
                key: 'customerID'
            }
        },
        message: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'membershipExpiryNotifications',
        timestamps: false
    });

    //Associations
    MembershipExpiryNotification.associate = function (models) {
        MembershipExpiryNotification.belongsTo(models.Customer, {
            foreignKey: 'customerID',
            as: 'customer'
        });
    };

    return MembershipExpiryNotification;
};
