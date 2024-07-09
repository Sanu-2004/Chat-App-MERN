const express = require('express');
const authorizetoken = require('../middleware/authorizetoken.js');
const { allFilterUsers } = require('../controller/users.controller.js');
const router = express.Router();

router.get('/', authorizetoken, allFilterUsers);

module.exports = router;