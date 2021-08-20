const GuildModel = require('../models/guild.models');
const UserModel = require('../models/user.models');
const GuildMemberModel = require('../models/guildMember.models');

exports.getGuild = async (guildName) => {
    try {
        const guild = await GuildModel.getGuilds(guildName);
        const master = await UserModel.getUser(guild.master_id);
        const guildMembers = await GuildMemberModel.getGuildMembers(guild.id);
        return { guild, master, guildMembers};
    } catch (e) {
        console.error("get guild service error: " + error);
        throw error;
    }
}