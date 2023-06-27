const mongoose = require('mongoose');
const {Schema} = mongoose; // eslint-disable-line no-unused-vars

const taskSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: String,
});

const TaskModel = mongoose.model('Goal', taskSchema);

async function connect() {
  const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DATABASE_NAME,
  } = process.env;

  const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;

  console.log('MONGO URI', MONGO_URI);
  console.log('MONGO DATABASE NAME', MONGO_DATABASE_NAME);

  mongoose.set('strictQuery', false);

  return mongoose.connect(MONGO_URI, {
    dbName: MONGO_DATABASE_NAME,
    user: MONGO_USERNAME,
    pass: MONGO_PASSWORD,
    authSource: 'admin',
  });
}

module.exports = {connect, TaskModel};
