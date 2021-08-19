const GuildModel = require('../models/guild.models');
exports.getGuild = async (guildName) => {
    try {
        const result  = await GuildModel.getGuilds()
        return result;
    } catch (e) {
        throw Error('Error Get Guild');
    }
}