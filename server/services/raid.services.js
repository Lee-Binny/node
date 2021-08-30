const RaidModel = require('../models/raid.models');
const RaidMemberModel = require('../models/raidMember.models');

exports.getRaids = async (guildId) => {
    try {
        const raids = await RaidModel.getRaids(guildId);
        return raids;
    } catch (e) {
        console.error("get raids service error: " + error);
        throw error;
    }
}

exports.insertRaid = async (uid, name, guildId, title, color, boss, date) => {
    try {
        const raid = await RaidModel.insertRaid(guildId, title, name, color, boss, date);
        await RaidMemberModel.insertRaidMember(raid.insertId, uid, name);
        const result = await RaidModel.getRaid(raid.insertId);
        return result;
    } catch (e) {
        console.error("insert raid service error: " + error);
        throw error;
    }
}

exports.updateRaid = async (id, title, color, boss) => {
    try {
        await RaidModel.updateRaid(id, title, color, boss);
        return ;
    } catch (e) {
        console.error("update raid service error: " + error);
        throw error;
    }
}