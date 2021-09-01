const pool = require('../db/dbConnection');
const RaidMemberQuery = require('./raidMember.query');
const RaidMemberModels = {
    insertRaidMember: async (raidId, memberId, memberName) => {
        try {
            const conn = await pool.getConnection();
            const query = RaidMemberQuery.insertRaidMember(raidId, memberId, memberName);
            await conn.query(query);
            conn.release();
            return ;
        } catch (error) {
            console.error("insert raid member model error: " + error);
            throw error;
        }
    }
}

module.exports = RaidMemberModels;