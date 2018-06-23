const express = require('express');
const img = require('./img');

const router = express.Router();
/* GET users listing. */
router.use('/img', img);

module.exports = router;
