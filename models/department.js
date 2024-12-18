'use strict';
module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        departmentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        managerID: {
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: 'department',
        timestamps: false
    });

    Department.associate = function (models) {
        // Example association (if managerID references an Employee):
        Department.belongsTo(models.Employee, {
            foreignKey: 'managerID',
            as: 'manager'
        });
    };

    return Department;
};
