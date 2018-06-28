const express = require('express');
const file = require('./file');

const router = express.Router();

router.use('/files', file);

module.exports = router;
