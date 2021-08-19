const {createPool} = require('mysql2/promise');
const dbConfig = require('./dbConfig');

const pool = createPool(dbConfig);
export default pool

// const connection = mysql.createConnection(dbConfig);
// connection.connect(error => {
//     if (error) throw error;
//     console.log("datebase connected successfully!");
// })

// module.exports = connection;