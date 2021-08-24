const pool = require('../db/dbConnection');
const BoardQuery = require('./board.query');
const BoardModels = {
    getBoards: async () => {
        try {
            const conn = await pool.getConnection();
            const query = BoardQuery.getBoards();
            const [result] = await conn.query(query);
            conn.release();
            return result;
        } catch (error) {
            console.error("get boards model error: " + error);
            throw error;
        }
    },
    writeBoard: async (title, desc, name) => {
        try {
            const conn = await pool.getConnection();
            const query = BoardQuery.writeBoard(title, desc, name);
            await conn.query(query);
            conn.release();
            return;
        } catch (error) {
            console.error("write board model error: " + error);
            throw error;
        }
    }
}

module.exports = BoardModels;