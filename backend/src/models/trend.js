const mongoose = require('mongoose');
const {Schema} = mongoose; // eslint-disable-line no-unused-vars

const topicSchema = new Schema({
  title: {type: String, required: true},
  value: {type: Number, required: true},
});

const keywordSchema = new Schema({
  keyword: {type: String, required: true},
  postNumber: {type: Number, required: true},
});

const stateSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  geoCode: String,
  keywords: [keywordSchema],
  relatedTopics: [topicSchema],
});

// eslint-disable-next-line no-unused-vars
const trendModel = mongoose.model('Trends', stateSchema);

module.exports = {
  TrendModel: trendModel,
  StateSchema: stateSchema,
};
