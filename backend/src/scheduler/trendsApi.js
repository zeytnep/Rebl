const googleTrends = require('google-trends-api');
const {TrendModel} = require('../models/trend.js');
const mongoose = require('mongoose');

async function trendUpdates(trends) {
  try {
    // eslint-disable-next-line no-unused-vars
    const saved = await trends.save();

    return 201;
  } catch (err) {
    console.error(err.message);
    return 501;
  }
}


async function collectStateData(stateData) {
  //  const d = [];
  const data = await stateData.map(({geoCode, geoName, value, hasData}) => {
    //  console.log(geoCode, geoName, value, hasData);
    googleTrends.relatedQueries(
        {keyword: 'corruption', geo: geoCode})
        .then(function(results) {
          const stateData = (JSON.parse(results)).default.rankedList;
          console.log(geoCode, geoName, value, hasData);
          //  console.log(stateData[0].rankedKeyword);

          const rankedKeywords = stateData[0].rankedKeyword;
          const queryData = rankedKeywords.map(
              (keyword) => {
                //  console.log(keyword);
                return {title: keyword.query, value: keyword.value};
              });

          const trendData = new TrendModel({
            _id: new mongoose.Types.ObjectId(),
            name: geoName,
            geoCode: geoCode,
            keywords: [{keyword: 'corruption', postNumber: value[0]}],
            relatedTopics: queryData,
          });

          trendUpdates(trendData);
          return stateData;
        });
  });

  return data;
}

async function gTrendsCalls() {
  googleTrends.interestByRegion({
    keyword: 'corruption',
    geo: 'US',
  }).then(async function(results) {
    const usData = (JSON.parse(results)).default.geoMapData;
    await collectStateData(usData);

    return usData;
  }).catch(function(err) {
    console.error('Oh no there was an error', err);
  });
};

gTrendsCalls();

module.exports = gTrendsCalls;
