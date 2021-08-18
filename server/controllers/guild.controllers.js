const guildService = require('../services/guild.services');

exports.getGuild = async (req, res) => {
    let guildName = req.query.guildName;
    try {
        guildService.getGuild(guildName)
    } catch (e) {
        
    }
}