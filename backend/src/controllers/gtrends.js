const express = require('express');
const router = express.Router(); //  eslint-disable-line new-cap
const {TrendModel} = require('../models/trend.js');

router.get('/states', async (req, res) => {
  TrendModel.find({}, (err, trends) => {
    res.json(trends);
  });
});

module.exports = router;
