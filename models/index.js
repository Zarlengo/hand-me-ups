const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const fs = require('fs');
const path = require('path');
const db = {};
const basename = path.basename(module.filename);

if (env === 'production') {
    // eslint-disable-next-line camelcase
    config = process.env.DATABASE_URL;
} else {
    config = require('../config/config.json')[env];
}

const sequelize = new Sequelize(
    config,
    {
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        },
    },
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((key) => {
    if ('associate' in db[key]) {
        db[key].associate(db);
    }
});

module.exports = db;
