module.exports = (sequelize, DataTypes) => {
    const Parent = sequelize.define('Parent', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address2: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Parent.associate = function (models) {
        Parent.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });

        Parent.hasMany(models.Child, {
            onDelete: 'cascade',
        });
    };

    return Parent;
};
