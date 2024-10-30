'use strict';
module.exports = (sequelize, DataTypes) => {
    const ArtifactExhibition = sequelize.define('ArtifactExhibition', {
        exhibitionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        artifactID: {
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
        tableName: 'artifact_exhibition',
        timestamps: false
    });

    ArtifactExhibition.associate = function (models) {
        // Associations
        ArtifactExhibition.belongsTo(models.Exhibition, {
            foreignKey: 'exhibitionID',
            as: 'exhibition'
        });
        ArtifactExhibition.belongsTo(models.Artifact, {
            foreignKey: 'artifactID',
            as: 'artifact'
        });
        ArtifactExhibition.belongsTo(models.Location, {
            foreignKey: 'locationID',
            as: 'location'
        });
    };

    return ArtifactExhibition;
};

