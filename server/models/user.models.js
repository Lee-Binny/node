const pool = require('../db/dbConnection');
const UserQuery = require('./user.query');
const UserModels = {
    getUser: async (userId) => {
        try {
            const conn = await pool.getConnection();
            const query = UserQuery.getUser(userId);
            const [result] = await conn.query(query);
            if (result.length === 0) {
                throw 'Not Found User';
            }
            conn.release();
            return result[0];
        } catch (error) {
            console.error("get user model error: " + error);
            throw error;
        }
    },
    getUserByName: async (userName) => {
        try {
            const conn = await pool.getConnection();
            const query = UserQuery.getUserByName(userName);
            const [result] = await conn.query(query);
            if (result.length === 0) {
                throw 'Not Found User';
            }
            conn.release();
            return result[0];
        } catch (error) {
            console.error("get user model error: " + error);
            throw error;
        }
    },
    loginUser: async (id, password) => {
        try {
            const conn = await pool.getConnection();
            const query = UserQuery.loginUser(id, password);
            const [result] = await conn.query(query);
            if (result.length === 0) {
                throw 'Not Found User';
            }
            conn.release();
            return result[0];
        } catch (error) {
            console.error("login model error: " + error);
            throw error;
        }
    }
}

module.exports = UserModels;