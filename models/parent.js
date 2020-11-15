module.exports = (sequelize, DataTypes) => {
    const bcrypt = require('bcryptjs');
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
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Parent.associate = function (models) {
        Parent.hasMany(models.Child, {
            onDelete: 'cascade',
        });
    };

    Parent.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Parent.addHook('beforeCreate', (user) => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    return Parent;
};
