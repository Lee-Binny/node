const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');

router.post('/login', userControllers.login);
router.get('/logout', userControllers.logout);

module.exports = router;