const mongoose = require('mongoose');
const {Schema} = mongoose; // eslint-disable-line no-unused-vars

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  authorId: String,
  name: String,
});

const postSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  subreddit: {
    type: String,
    lowercase: true,
    trim: true,
  },
  postId: String,
  nameId: String,
  title: String,
  user: userSchema,
  url: String,
  keywords: [{type: String, lowercase: true, trim: true}],
  postSchema: {
    upvotes: {type: Number},
    downvotes: {type: Number},
    score: {type: Number},
  },
});

// eslint-disable-next-line no-unused-vars
const postModel = mongoose.model('Post', postSchema);

module.exports = {
  PostModel: postModel,
  PostSchema: postSchema,
  UserSchema: userSchema,
};
