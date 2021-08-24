const BoardModel = require('../models/board.models');

exports.getBoards = async () => {
    try {
        const result = await BoardModel.getBoards();
        return result;
    } catch (e) {
        console.error("get boards service error: " + error);
        throw error;
    }
}

exports.writeBoard = async (title, desc, name) => {
    try {
        await BoardModel.writeBoard(title, desc, name);
        return ;
    } catch (e) {
        console.error("write board service error: " + error);
        throw error;
    }
}