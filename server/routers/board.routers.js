const express = require('express');
const router = express.Router();
const boardControllers = require('../controllers/board.controllers');

router.get('/', boardControllers.getBoards);
router.post('/write', boardControllers.writeBoard);

module.exports = router;