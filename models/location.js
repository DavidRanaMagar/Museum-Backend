'use strict';
module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
            locationID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            building: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            floor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            section: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'section'
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
            },
        },
        {
            tableName: 'location',
            timestamps: true,
        });
    return Location;
}