const boardService = require('../services/board.services');

exports.getBoards = async (req, res) => {
    try {
        const result = await boardService.getBoards();
        res.send({ok: true, result: result});
    } catch (error) {
        console.error("get boards controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}

exports.writeBoard = async (req, res) => {
    let { title, desc, name } = req.body.data;
    try {
        await boardService.writeBoard(title, desc, name);
        res.send({ok: true});
    } catch (error) {
        console.error("write board controllers error: " + error);
        res.send({ok: false, error: error.message});
    }
}