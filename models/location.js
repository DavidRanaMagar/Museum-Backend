module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
        locationId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        building: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        floor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        builseding: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Location.associate = (models) => {
    //   Location.belongsTo(models.User, {
    //     foreignKey: 'userId',
    //     onDelete: 'CASCADE',
    //   });
    // };

    return Location;
}