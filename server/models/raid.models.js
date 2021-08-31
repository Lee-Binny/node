const pool = require('../db/dbConnection');
const RaidQuery = require('./raid.query');

const RaidModels = {
    getRaid: async (raidId) => {
        try {
            const conn = await pool.getConnection();
            const query = RaidQuery.getRaid(raidId);
            const [result] = await conn.query(query);
            if (result.length === 0) {
                throw 'Not Found Raid';
            }

            conn.release();
            return result[0];
        } catch (error) {
            console.error("get raid model error: " + error);
            throw error;
        }
    },
    getRaids: async (guildId) => {
        try {
            const conn = await pool.getConnection();
            const query = RaidQuery.getRaids(guildId);
            const [result] = await conn.query(query);
            conn.release();
            return result;
        } catch (error) {
            console.error("get raids model error: " + error);
            throw error;
        }
    },
    insertRaid: async (guildId, title, name, color, boss, date) => {
        try {
            const conn = await pool.getConnection();
            const query = RaidQuery.insertRaid(guildId, title, name, color, boss, date);
            const [result] = await conn.query(query);
            if (result.length === 0) {
                throw 'Not Found Raids';
            }

            conn.release();
            return result;
        } catch (error) {
            console.error("insert raid model error: " + error);
            throw error;
        }
    },
    updateRaid: async (id, title, color, boss) => {
        try {
            const conn = await pool.getConnection();
            const query = RaidQuery.updateRaid(id, title, color, boss);
            await conn.query(query);

            conn.release();
            return ;
        } catch (error) {
            console.error("update raid model error: " + error);
            throw error;
        }
    }
}

module.exports = RaidModels;