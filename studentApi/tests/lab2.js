const mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'archi',
  port: 3306
});

connection.connect(() => {
  console.log('Connected to Mysql Server...');
});

// connection.query('create database archi', (err, results, fields) => {
//   if (err) throw err;
//   console.log(results);
// })

connection.query('create table student (id smallint(6), name varchar(255))', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
})

//connection.end();

