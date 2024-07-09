const express = require('express');
const { sendMessage, getMessages } = require('../controller/massage.controller.js');
const authorizetoken = require('../middleware/authorizetoken.js');

const router = express.Router();


router.get('/:id', authorizetoken, getMessages);

router.post('/send/:id', authorizetoken, sendMessage);

module.exports = router;
