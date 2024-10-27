'use strict';
module.exports = (sequelize, DataTypes) => {
    const EmployeeHours = sequelize.define('EmployeeHours', {
        employeeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Employee', // Name of the referenced model
                key: 'employeeID' // Key in the referenced model
            }
        },
        workDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            primaryKey: true,
        },
        hoursWorked: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        createdBy: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
        updatedBy: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    }, {
        tableName: 'employee_hours',
        timestamps: false,
        primaryKey: ['employeeID', 'workDate'] // Composite primary key
    });

    EmployeeHours.associate = function (models) {
        // associations can be defined here
        EmployeeHours.belongsTo(models.Employee, {
            foreignKey: 'employeeID',
            as: 'employee'
        });
    };

    return EmployeeHours;
};
