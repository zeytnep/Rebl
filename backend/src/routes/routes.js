const express = require('express');
const router = express.Router(); //  eslint-disable-line new-cap
const redditApi = require('../controllers/reddit.js');
const gTrendsApi = require('../controllers/gtrends.js');

router.use('/reddit', redditApi);
router.use('/gtrends', gTrendsApi);

module.exports = router;
