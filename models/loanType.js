'use strict';
module.exports = (sequelize, DataTypes) => {
    const LoanType = sequelize.define('LoanType', {
        loanTypeID: {
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
        tableName: 'loan_type',
        timestamps: false
    });

    LoanType.associate = function (models) {

    };

    return LoanType;
};
