module.exports = (sequelize, DataTypes) => {
    const bcrypt = require('bcryptjs');
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true, // checks for email format (foo@bar.com)
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sessionSalt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    User.associate = function (models) {
        User.hasOne(models.Parent, {
            onDelete: 'cascade',
        });
    };

    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook('beforeCreate', (user) => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    return User;
};
