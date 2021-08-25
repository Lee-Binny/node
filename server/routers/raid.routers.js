const express = require('express');
const router = express.Router();
const raidControllers = require('../controllers/raid.controllers');

router.get('/', raidControllers.getRaids);
router.post('/insert', raidControllers.insertRaid);

module.exports = router;