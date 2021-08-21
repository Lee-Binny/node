const pool = require('../config/dbConnection');
const RaidQuery = require('./raid.query');
const RaidModels = {
    getRaids: async (guildId) => {
        try {
            const conn = await pool.getConnection();
            const query = RaidQuery.getRaids(guildId);
            const [result] = await conn.query(query);
            conn.release();
            return result;
        } catch (error) {
            console.error("get raid model error: " + error);
            throw error;
        }
    }
}

module.exports = RaidModels;