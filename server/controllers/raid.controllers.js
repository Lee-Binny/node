const raidService = require('../services/raid.services');

exports.getRaids = async (req, res) => {
    let guildId = req.query.guildId;
    try {
        const raids= await raidService.getRaids(guildId);
        res.send({ok: true, result: raids})
    } catch (error) {
        console.error("get raids controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}

exports.insertRaid = async (req, res) => {
    let { uid, name, guildId, title, color, boss, date} = req.body;
    try {
        const raid = await raidService.insertRaid(uid, name, guildId, title, color, boss, date);
        res.send({ok: true, result: raid});
    } catch (error) {
        console.error("insert raid controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}

exports.updateRaid = async (req, res) => {
    let { id, title, color, boss } = req.body;
    try {
        await raidService.updateRaid(id, title, color, boss);
        res.send({ok: true});
    } catch (error) {
        console.error("update raid controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}