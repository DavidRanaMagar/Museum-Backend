'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArtifactStatus = sequelize.define('ArtifactStatus', {
    artifactStatusID: {
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
    tableName: 'artifact_status',
    timestamps: false
  });

  ArtifactStatus.associate = function(models) {
    // Define associations here
    // Example association if ArtifactStatus is used in another table:
    // ArtifactStatus.hasMany(models.Artifact, { foreignKey: 'artifactStatusID', as: 'artifacts' });
  };

  return ArtifactStatus;
};
