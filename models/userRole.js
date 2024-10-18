'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        roleCode: {
            type: DataTypes.SMALLINT, // Matches your SQL definition
            primaryKey: true,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING(20),
            allowNull: false
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
        tableName: 'user_role', // Ensure the correct table name
        timestamps: false // Adjusted to match your SQL definition
    });

    UserRole.associate = function (models) {
        // Define any associations here, if needed
    };

    return UserRole;
};
