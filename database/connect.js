const mongoose = require('mongoose');
const { color } = require('../lib/color.js');
const dbURI = "mongodb+srv://marinkitagawa:johannes123@restapi.pbjm0nh.mongodb.net/?retryWrites=true&w=majority";

function connectMongoDb() {
  mongoose.connect(dbURI, {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
    serverSelectionTimeoutMS: 8000 // menambahkan timeout
  })
  .then(() => {
    console.log(color('[INFO] Connect to DB success!', 'red'));
  })
  .catch(err => {
    console.error(color(`[ERROR] Failed to connect to DB: ${err.message}`, 'red'));
  });
}

module.exports.connectMongoDb = connectMongoDb;
