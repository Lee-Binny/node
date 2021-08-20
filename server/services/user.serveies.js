const GuildMemberModel = require('../models/guildMember.models');
exports.getGuildMembers = async (guildId) => {
    try {
        const result  = await GuildMemberModel.getGuildMembers(guildId);
        return result;
    } catch (e) {
        console.error("get guild member service error: " + error);
        throw error;
    }
}