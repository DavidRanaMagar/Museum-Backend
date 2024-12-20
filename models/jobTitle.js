'use strict';
module.exports = (sequelize, DataTypes) => {
    const JobTitle = sequelize.define('JobTitle', {
        jobTitleID: {
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
        tableName: 'job_title',
        timestamps: false
    });

    JobTitle.associate = function (models) {
        // associations can be defined here
        // If there are associations with other models, add them here
    };

    return JobTitle;
};
