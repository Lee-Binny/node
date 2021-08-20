const pool = require('../config/dbConnection');
const GuildQuery = require('./guild.query');
const GuildModels = {
    getGuilds: async (guildName) => {
        try {
            const conn = await pool.getConnection();
            const query = GuildQuery.getGuild(guildName);
            const [result] = await conn.query(query);
            if (result.length === 0) {
                throw 'Not Found Guild';
            }

            conn.release();
            return result[0];
        } catch (error) {
            console.error("get guild model error: " + error);
            throw error;
        }
    }
}

module.exports = GuildModels;