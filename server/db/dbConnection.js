const { createPool } = require('mysql2/promise');
const dbConfig = require('./dbConfig');

const pool = createPool(dbConfig);
module.exports = pool;