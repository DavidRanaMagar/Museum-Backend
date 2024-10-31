'use strict';
module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        loanID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        loanTypeID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'LoanType',
                key: 'loanTypeID'
            }
        },
        loanStartDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        loanEndDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        borrowerLender: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        loanAgreement: {
            type: DataTypes.TEXT,
            allowNull: false
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
        tableName: 'loan',
        timestamps: false
    });

    Loan.associate = function (models) {
        Loan.belongsTo(models.LoanType, {
            foreignKey: 'loanTypeID',
            as: 'loanType'
        });
    };

    return Loan;
};
