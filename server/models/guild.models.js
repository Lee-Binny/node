const pool = require('../config/dbConnection');
const GuildQuery = require('./guild.query');
const GuildModels = {
    getGuilds: async (guildName) => {
        try {
            const conn = await pool.getConnection();
            const query = GuildQuery.getGuild(guildName);
            const [[result]] = await conn.query(query);
            // TODO result.length === 0 예외 처리
            conn.release();
            return result;
        } catch (error) {
            console.log("model error: " + error);
        }
    }
}

module.exports = GuildModels;