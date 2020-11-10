module.exports = (sequelize, DataTypes) => {
    const Parent = sequelize.define('Parent', {
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address1: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        zipcode: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    });

    Parent.associate = function (models) {
        Parent.hasMany(models.Child, {
            onDelete: 'cascade',
        });
    };

    return Parent;
};
