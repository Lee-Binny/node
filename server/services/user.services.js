const UserModel = require('../models/user.models');

exports.loginUser = async (id, password) => {
    try {
        const result  = await UserModel.loginUser(id, password);
        return result;
    } catch (e) {
        console.error("get guild member service error: " + error);
        throw error;
    }
}