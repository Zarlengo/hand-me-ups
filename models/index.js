const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';

if (env === 'production') {
    // eslint-disable-next-line camelcase
    config = { use_env_variable: 'DATABASE_URL', dialect: 'postgres' };
    console.log(config);
} else {
    config = require('../config/config.json')[env];
}

const sequelize = new Sequelize(config);

const db = {
    User: require('./user')(sequelize, Sequelize.DataTypes),
    Parent: require('./parent')(sequelize, Sequelize.DataTypes),
    Child: require('./child')(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((key) => {
    if ('associate' in db[key]) {
        db[key].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
