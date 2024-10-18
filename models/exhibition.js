module.exports = function (sequelize, DataTypes) {
    const Exhibition = sequelize.define('Exhibition', {
        exhibitionId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        locationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    // Exhibition.associate = (models) => {
    //   Exhibition.belongsTo(models.User, {
    //     foreignKey: 'userId',
    //     onDelete: 'CASCADE',
    //   });
    //   Exhibition.belongsTo(models.Location, {
    //     foreignKey: 'locationId',
    //     onDelete: 'CASCADE',
    //   });
    // };

    return Exhibition;
}