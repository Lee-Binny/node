const guildService = require('../services/guild.services');

exports.getGuild = async (req, res) => {
    let guildName = req.query.guildName;
    try {
        const result = await guildService.getGuild(guildName);
        res.send(result);
    } catch (e) {
        
    }
}