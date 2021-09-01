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

exports.insertGuild = async (req, res) => {
    let { name, uid } = req.body;
    try {
        const {guild} = await guildService.insertGuild(name, uid);
        res.send({ok: true, guild: guild});
    } catch (error) {
        console.error("insert guild controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}

exports.insertGuildMember = async (req, res) => {
    let { guildId, userId, userName } = req.body;
    try {
        await guildService.insertGuildMember(guildId, userId, userName);
        res.send({ok: true});
    } catch (error) {
        console.error("insert guild member controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}