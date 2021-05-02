// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// const mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'archi',
//   port:3006 
// });

module.exports = {

HOST: "localhost",

USER: "root",

PASSWORD: "",

DB: "archi",

dialect: "mysql",

pool: {

max: 5,

min: 0,

acquire: 30000,

idle: 10000

}

};

// module.exports = connection;