const pool = require('../db/dbConnection');
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
    },
    getGuildName: async (guildId) => {
        try {
            const conn = await pool.getConnection();
            const query = GuildQuery.getGuildName(guildId);
            const [result] = await conn.query(query);
            conn.release();
            return result[0];
        } catch (error) {
            console.error("get guild name model error: " + error);
            throw error;
        }
    },
    insertGuild: async (name, uid) => {
        try {
            const conn = await pool.getConnection();
            const query = GuildQuery.insertGuild(name, uid);
            const [result] = await conn.query(query);
            conn.release();
            return result;
        } catch (error) {
            console.error("get guild name model error: " + error);
            throw error;
        }
    }
}

module.exports = GuildModels;