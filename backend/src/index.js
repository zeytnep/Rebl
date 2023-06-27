const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const {connect, TaskModel} = require('./mongo.js');
// eslint-disable-next-line no-unused-vars
const {redditScheduler, gTrendsScheduler} = require('./scheduler/scheduler.js');
const cors = require('cors');
const apiRoutes = require('./routes/routes.js');
//  const redditTasks = require('./scheduler/scheduler.js');
const mongoose = require('mongoose');
//  const adminRoutes = require('./routes/devRoutes.js');
//  const {Client} = require('twitter-api-sdk');

const app = express();
const CONFIG_PATH = path.join(__dirname, '../', 'config/.env');

const PORT = process.env.PORT || 8080;

dotenv.config({
  path: CONFIG_PATH,
});

app.use(cors());

app.get('/', (req, res) => {
  res.send({service: 'backend'});
});

app.get('/api/post', async (req, res) => {
  const task = new TaskModel({
    _id: new mongoose.Types.ObjectId(),
    text: 'Hello World',
  });

  try {
    // eslint-disable-next-line no-unused-vars
    const saved = await task.save();
    // console.log('Saved', saved);

    res.status(201).json({
      message: 'Task has been added',
      task: {id: task._id, text: 'Hello World'},
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({message: 'Failed to save.'});
  }

  // res.send({ service: "backend" });
});

app.use('/api', apiRoutes);
//  app.use('/admin', adminRoutes);

/*  eslint-disable  */
/*
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE_NAME,
} = process.env;
*/
/*  eslint-enable */

const server = connect().then(
    async () => {
      const {MONGO_HOSTNAME, MONGO_PORT} = process.env;

      console.log(
          `Running MongoDB instance at port ${MONGO_PORT}
          and host ${MONGO_HOSTNAME}...`,
      );

      //  app.set('port', PORT);

      app.listen(PORT, () => {
        console.log(`Backend server listening on port ${PORT}...`);
        redditScheduler;
        gTrendsScheduler;
      });
    },
    (err) => {
      console.error(`Unable to start mongo at...`);
      console.error(err);
    },
);

// const server = app.listen(PORT, () => {
//   console.log(`Backend server listening on port ${PORT}...`);
//   redditTasks;
// });

module.exports = server;
