const express = require('express');
const router = express.Router();

const { usersController } = require('../controllers');

router.route('/').post(usersController.createUser);

module.exports = router;
