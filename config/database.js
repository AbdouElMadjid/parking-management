
require('dotenv').config();

const { Sequelize } = require('sequelize');

const database = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
{
        host: process.env.DB_HOST,
        dialect: 'mysql'
        //   port: process.env.DB_PORT
    }
);

module.exports = database;
// const { Sequelize } = require('sequelize');

// const database = new Sequelize('ParkingDB', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

// module.exports = database;
