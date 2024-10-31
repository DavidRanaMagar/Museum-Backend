'use strict';
module.exports = (sequelize, DataTypes) => {
    const ArtifactLoan = sequelize.define('ArtifactLoan', {
        artifactID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        loanID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        tableName: 'artifact_loan',
        timestamps: false
    });

    ArtifactLoan.associate = function (models) {
        // Associations
        ArtifactLoan.belongsTo(models.Artifact, {
            foreignKey: 'artifactID',
            as: 'artifact'
        });
        ArtifactLoan.belongsTo(models.Loan, {
            foreignKey: 'loanID',
            as: 'loan'
        });
    };

    return ArtifactLoan;
};
