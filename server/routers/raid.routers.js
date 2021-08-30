const express = require('express');
const router = express.Router();
const raidControllers = require('../controllers/raid.controllers');

router.get('/', raidControllers.getRaids);
router.post('/insert', raidControllers.insertRaid);
router.post('/update', raidControllers.updateRaid);

module.exports = router;