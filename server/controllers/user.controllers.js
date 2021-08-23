const uesrService = require('../services/user.services');

exports.login = async (req, res) => {
    let { id, password } = req.body;
    try {
        const result = await uesrService.loginUser(id, password);
        req.session.uid = result.id;
        req.session.userId = result.user_id;
        res.send({ok: true, result: result});
    } catch (error) {
        console.error("login controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}

exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("logout controllers error: " + err);
            res.send({ok: false, error: err});
        } else {
            res.send({ok: true});
        }
    });
}

exports.signup = async (req, res) => {
    const { userId, password, name } = req.body.data
    try {
        const result = await uesrService.signup(userId, password, name);
        req.session.uid = result.id;
        req.session.userId = result.user_id;
        res.send({ok: true, result: result});
    } catch (error) {
        console.error("signup controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}

exports.deleteUser = async (req, res) => {
    const { id, password } = req.body;
    try {
        await uesrService.deleteUser(id, password);
        req.session.destroy(err => {
            if (err) {
                console.error("logout controllers error: " + err);
                res.send({ok: false, error: err});
            }
        });
        res.send({ok: true});
    } catch (error) {
        console.error("delete user controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}