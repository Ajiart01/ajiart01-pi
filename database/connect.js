const mongoose = require('mongoose');
const { color } = require('../lib/color.js');
const dbURI = "mongodb+srv://ajiart01:ajifu917@atlascluster.sws1np9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

function connectMongoDb() {
  mongoose.connect(dbURI, {
    serverApi: { version: '1', strict: true, deprecationErrors: true },
    serverSelectionTimeoutMS: 5000 // menambahkan timeout
  })
  .then(() => {
    console.log(color('[INFO] Connect to DB success!', 'red'));
  })
  .catch(err => {
    console.error(color(`[ERROR] Failed to connect to DB: ${err.message}`, 'red'));
  });
}

module.exports.connectMongoDb = connectMongoDb;
