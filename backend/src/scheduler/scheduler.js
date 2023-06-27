//  eslint-disable-next-line no-unused-vars
const schedule = require('node-schedule');
const gTrendsCalls = require('./trendsApi.js');
const redditCalls = require('./redditApi.js');

const redditScheduler = schedule.scheduleJob('* */30 * * * *', redditCalls);
//  eslint-disable-next-line no-unused-vars
const gTrendsScheduler = schedule.scheduleJob('* * */1 * * *', gTrendsCalls);

module.exports = {redditScheduler, gTrendsScheduler};
