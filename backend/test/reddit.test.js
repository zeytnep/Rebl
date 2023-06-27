const request = require('supertest');
const baseUrl = 'http://localhost:8080/api/reddit';
const mongoose = require('mongoose');

describe('Subreddit API Tests.', () => {
  describe('GET r/corruption', () => {
    test('should return 200', async () => {
      const response = await request(baseUrl).get('/r/corruption');
      expect(response.statusCode).toBe(200);
      expect(response.error).toBe(false);
    });
  });
});

describe('Reddit Post Model Saving Tests.', () => {
  test('Incorrect test saved.', async () => {
    const postTest = [{
      _id: new mongoose.Types.ObjectId(),
      subreddit: 'texas',
      postId: '1efa134vh',
      nameId: '123gas8',
      title: 'fake post title for incorrect data',
      user: [],
      url: 'www.reddit.com/r/corruption',
      keywords: [123, 1234],
      postSchema: {upvotes: 1, downvotes: 1, score: 0},
    }];

    const response = await request(postTest).post('/state');
    response.expect(response.statusCode).toBe(501);
    response.expect(response.error).toBe(true);
  });

  test('Correct test saved.', async () => {
    const postTest = [{
      _id: new mongoose.Types.ObjectId(),
      subreddit: 'texas',
      postId: '1efa134vh',
      nameId: '123gas8',
      title: 'fake post title for correct data',
      user: {
        _id: new mongoose.Types.ObjectId(),
        authorId: '1df3uds',
        name: 'Judi Smith',
      },
      url: 'www.reddit.com/r/corruption',
      keywords: ['corruption', 'politics'],
      postSchema: {upvotes: 1, downvotes: 1, score: 0},
    }];

    const response = await request(postTest).post('/state');
    response.expect(response.statusCode).toBe(200);
    response.expect(response.error).toBe(false);
  });
});
