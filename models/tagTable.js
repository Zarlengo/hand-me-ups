module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Tag;
};
