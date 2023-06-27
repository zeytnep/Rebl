const {env} = require('node:process'); //  eslint-disable-line no-unused-vars
const {MongoMemoryServer} = require('mongodb-memory-server');
const {connect, disconnect} = '../mongo.js';

afterAll(async () => {
  server.close();
  schedule.gracefulShutdown();

  mongod.stop()
      .then(disconnect()
          .then(() => done()))
      .catch((err) => done(err));
});

beforeAll(async () => {
  const mongod = new MongoMemoryServer();

  await mongod.start();

  connect(mongod.getUri())
      .then(() => done())
      .catch((err) => done(err));
});
