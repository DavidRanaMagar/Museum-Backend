'use strict';
module.exports = (sequelize, DataTypes) => {
    const CCategory = sequelize.define('CCategory', {
        categoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true
        },
        createdBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW,
            allowNull: true
        },
        updatedBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        }
    }, {
        tableName: 'category',
        timestamps: false
    });

    return CCategory;
};
