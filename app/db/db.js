const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    dialectOptions: {
        //useUTC: false,
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next();
        }
    },
    timezone: process.env.DB_TIMEZONE
});

//Check if the database is connected successfully
sequelize.authenticate()
    .then(() => {
        console.log('Connection established successfully');
    })
    .catch((error) => {
        console.log(error);
});

//Create db table if it does not exist
sequelize.sync();

module.exports = sequelize;