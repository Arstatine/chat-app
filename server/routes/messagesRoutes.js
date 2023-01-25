const express = require('express');
const router = express.Router();

const { messagesController } = require('../controllers');

router.route('/:id').post(messagesController.sendMessage);

router.route('/:sender/:receiver').get(messagesController.getMessage);

router.route('/delete/:sender/:receiver').get(messagesController.deleteAll);

module.exports = router;
