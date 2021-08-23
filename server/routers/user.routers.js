const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');

router.post('/login', userControllers.login);
router.get('/logout', userControllers.logout);
router.post('/signup', userControllers.signup);
router.post('/delete', userControllers.deleteUser);

module.exports = router;