const request = require('supertest');
const baseUrl = 'http://localhost:8080/api/gtrends'; ;

describe('Google Trends Tests', () => {
  describe('GET r/corruption', () => {
    test('should return 200', async () => {
      const response = await request(baseUrl).get('/states');
      expect(response.statusCode).toBe(200);
      expect(response.error).toBe(false);
    });
  });
});

describe('Google Trend model saving tests.', () => {
  test('Incorrect test saved.', async () => {
    const trendTest = [{
      _id: new mongoose.Types.ObjectId(),
      name: 'texas',
      geoCode: 'US-TX',
      keywords: [{keyword: 'corruption', postNumber: 14},
        {keyword: 'policy', postNumber: '14'}],
      relatedTopics: [{title: 'corruption', value: 15},
        {title: 'donald trump arrest corruption', value: '14'}],
    }];

    const response = await request(trendTest).post('/state');
    response.expect(response.statusCode).toBe(501);
    response.expect(response.error).toBe(true);
  });

  test('Correct test saved.', async () => {
    const trendTest = [{
      _id: new mongoose.Types.ObjectId(),
      name: 'texas',
      geoCode: 'US-TX',
      keywords: [{keyword: 'corruption', postNumber: 14},
        {keyword: 'policy', postNumber: 14}],
      relatedTopics: [{title: 'corruption', value: 15},
        {title: 'donald trump arrest corruption', value: 14}],
    }];

    const response = await request(trendTest).post('/state');
    response.expect(response.statusCode).toBe(200);
    response.expect(response.error).toBe(false);
  });
});
