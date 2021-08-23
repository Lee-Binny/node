const uesrService = require('../services/user.services');

exports.login = async (req, res) => {
    let { id, password } = req.body;
    try {
        const result = await uesrService.loginUser(id, password);
        req.session.uid = result.id;
        req.session.userId = result.user_id;
        res.send({ok: true, result: result});
    } catch (error) {
        res.send({ok: false, error: error.message});
    }
}

exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send({ok: false, error: error});
        } else {
            res.send({ok: true});
        }
    });
}