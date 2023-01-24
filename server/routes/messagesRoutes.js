const express = require('express');
const router = express.Router();

const { messagesController } = require('../controllers');

router.route('/:id').post(messagesController.sendMessage);

router.route('/:sender/:receiver').get(messagesController.getMessage);

module.exports = router;
