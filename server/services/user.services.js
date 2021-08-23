const UserModel = require('../models/user.models');

exports.loginUser = async (id, password) => {
    try {
        const result  = await UserModel.loginUser(id, password);
        return result;
    } catch (e) {
        console.error("log in service error: " + error);
        throw error;
    }
}

exports.signup = async (userId, password, name) => {
    try {
        const existed = await UserModel.getUserByUserIdOrName(userId, name);
        if (existed) {
            throw 'already existed user';
        }
        await UserModel.signup(userId, password, name);
        const result = await UserModel.getUserByUserId(userId);
        return result;
    } catch (e) {
        console.error("sign up service error: " + error);
        throw error;
    }
}