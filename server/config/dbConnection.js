const mysql = require('mysql');
const dbConfig = require('./dbConfig');

const connection = mysql.createConnection(dbConfig);
connection.connect(error => {
    if (error) throw error;
    console.log("datebase connected successfully!");
})

module.exports = connection;