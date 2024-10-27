'use strict';
module.exports = (sequelize, DataTypes) => {
    const Exhibition = sequelize.define('Exhibition', {
        exhibitionId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timeSlot: {
            type: DataTypes.TIME,
            allowNull: true, // Optional
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Location', // Reference to the Location model
                key: 'locationId',
            },
        },
        imageUrl: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'exhibition',
        timestamps: true,
    });

    Exhibition.associate = function (models) {
        Exhibition.belongsTo(models.Location, {foreignKey: 'locationId'});
    };
    return Exhibition;
};