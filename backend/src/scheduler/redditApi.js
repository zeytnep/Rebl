const {default: axios} = require('axios');
const {PostModel} = require('../models/post.js');
const mongoose = require('mongoose');

const states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
  'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
  'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'NewHampshire', 'NewJersey',
  'NewMexico', 'NewYork', 'NorthCarolina', 'NorthDakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'RhodeIsland',
  'SouthCarolina', 'SouthDakota', 'Tennessee', 'Texas',
  'Utah', 'Vermont', 'Virginia', 'Washington', 'WestVirginia',
  'Wisconsin', 'Wyoming'];

async function getAllStatesData() {
  const statesData = await Promise.all(states.map(async (state) => {
    return await axios
        .get(`https://www.reddit.com/r/${state}.json`)
        .then((response) => {
          //  total = total + response.data.data.dist;
          return response.data.data.children;
        });
  }));

  //  console.log(statesData);
  return statesData;
}


async function postUpdates(post) {
  try {
    const posts = await PostModel.find({postId: post.postId});

    if (posts.length == 0) {
      const saved = await post.save(); // eslint-disable-line no-unused-vars
      //  console.log('Post has been saved');
    }
    /*
    else {
      console.log('Post already added');
    }
    */

    return 201;
  } catch (err) {
    console.error(err.message);
    return 501;
  }
}

//  eslint-disable-next-line no-unused-vars
async function redditCalls() {
  console.log('Reddit schedule jobs running...');

  /*
  const response = await axios
      .get(`https://www.reddit.com/r/corruption.json`)
      .then((res) => {
      // console.log('got response');
        return res.data;
      });
  */

  const states = await getAllStatesData();
  //  console.log(typeof states);

  //  const time = new Date(Date.now()).toISOString();

  states.map((state) => {
    const posts = state.map(({data: post}) => {
      return new PostModel({
        _id: new mongoose.Types.ObjectId(),
        subreddit: post.subreddit,
        postId: post.id,
        nameId: post.name,
        title: post.title,
        //  eslint-disable-next-line max-len
        permalink: post.permalink,
        user: {
          _id: new mongoose.Types.ObjectId(),
          authorId: post.author_fullname,
          name: post.author,
        },
        keywords: ['corruption', 'politics'],
        postSchema: {
          upvotes: post.ups,
          downvotes: post.downs,
          score: post.score,
        },
      });
    });

    posts.map((post) => {
      postUpdates(post);
    });
  });

  //  return {postNums: postNumResults, posts: posts, recordedTime: time};
  return 0;
}

module.exports = redditCalls;
