const express = require('express');
const router = express.Router(); //  eslint-disable-line new-cap
// eslint-disable-next-line no-unused-vars
const {default: axios} = require('axios');
const {PostModel} = require('../models/post.js');
//  const mongoose = require('mongoose');

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

router.get('/r/:subreddit', async (req, res) => {
  const subreddit = req.params.subreddit;
  const posts = await getRedditPosts(subreddit);
  console.log(posts.data.dist);
  const time = new Date(Date.now()).toISOString();
  res.json({
    subreddit: subreddit,
    total_post: posts.data.dist,
    last_updated: time,
  });
});

router.get('/u/:author', async (req, res) => {
  const author = req.params.author;
  const user = await getRedditUser(author);
  res.json(user);
});

router.get('/states', async (req, res) => {
  //  const subreddit = req.params.subreddit;
  //  const posts = await PostModel.find({subreddit: 'corruption'});
  const time = new Date(Date.now()).toISOString();

  const stateInfo = await Promise.all(states.map(async (state) => {
    const count = await PostModel.count({subreddit: state.toLowerCase()});

    return {state: state, postCount: count, time: time};
  }));

  res.json(stateInfo);
});

router.post('/retrieve-test', async (req, res) => {
  const posts = await PostModel.find({subreddit: 'corruption'});

  posts.map((post) => {
    console.log(post);
  });
  //  console.log(posts);

  res.send({message: 'retrieved tests'});
});

router.post('/total-posts', async (req, res) => {
  res.send({message: ''});
});

module.exports = router;
