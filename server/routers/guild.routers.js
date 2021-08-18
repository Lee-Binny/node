const express = require('express');
const router = express.Router();
const guildControllers = require('../controllers/guild.controllers');

router.get('/', guildControllers.getGuild);

module.exports = router;