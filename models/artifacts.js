'use strict';
module.exports = (sequelize, DataTypes) => {
    const Artifact = sequelize.define('Artifact', {
        artifactID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        creator: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        acquiredDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        artifactStatusID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dimension: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        storedLocationID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        material: {
            type: DataTypes.STRING(125),
            allowNull: true
        },
        owner: {
            type: DataTypes.STRING(30),
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
        tableName: 'artifact',
        timestamps: false
    });

    Artifact.associate = function (models) {
        // associations can be defined here
        Artifact.belongsTo(models.ArtifactStatus, {
            foreignKey: 'artifactStatusID',
            as: 'status'
        });
        Artifact.belongsTo(models.Location, {
            foreignKey: 'storedLocationID',
            as: 'location'
        });
        Artifact.hasMany(models.ArtifactExhibition, {
            foreignKey: 'artifactID',
            as: 'exhibitions'
        });
        Artifact.hasMany(models.ArtifactLoan, {
            foreignKey: 'artifactID',
            as: 'loans'
        });
    };

    return Artifact;
};
