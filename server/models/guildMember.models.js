const pool = require('../db/dbConnection');
const GuildMemberQuery = require('./guildMember.query');
const GuildMemberModels = {
    getGuildMembers: async (guildId) => {
        try {
            const conn = await pool.getConnection();
            const query = GuildMemberQuery.getGuildMembers(guildId);
            const [result] = await conn.query(query);
            if (result.length === 0) {
                throw 'Not Found Guild Members';
            }

            conn.release();
            return result;
        } catch (error) {
            console.error("get guild member model error: " + error);
            throw error;
        }
    },
    getMyGuild: async (userId) => {
        try {
            const conn = await pool.getConnection();
            const query = GuildMemberQuery.getMyGuild(userId);
            const [result] = await conn.query(query);
            conn.release();
            return result[0];
        } catch (error) {
            console.error("get my guild model error: " + error);
            throw error;
        }
    }
}

module.exports = GuildMemberModels;