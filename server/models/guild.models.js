const pool = require('../config/dbConnection');

const GuildModels = {
    getGuilds: async () => {
        try {
            const conn = await pool.getConnection();
            const query = 'SELECT * FROM guild';
            const [result] = await conn.query(query);
            conn.release();
            return result;


        } catch (error) {
            
        }
    }
}

module.exports = GuildModels