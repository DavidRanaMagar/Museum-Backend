'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        role: {
            type: DataTypes.SMALLINT, // Use SMALLINT to match your SQL definition
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
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
        tableName: 'user', // Changed to the correct table name
        timestamps: false // Adjusted to match your SQL definition for timestamps
    });

    User.associate = function (models) {
        User.belongsTo(models.UserRole, { // Adjust association to match foreign key
            foreignKey: 'role',
            targetKey: 'roleCode'
        });
    };

    return User;
};
