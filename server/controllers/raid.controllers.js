const guildService = require('../services/guild.services');

exports.getGuild = async (req, res) => {
    let guildName = req.query.guildName;
    try {
        const { guild, master, guildMembers } = await guildService.getGuild(guildName);
        res.send({ok: true, guild: guild, master: master, members: guildMembers});
    } catch (error) {
        console.error("get guild controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}