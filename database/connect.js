const mongoose = require('mongoose');
const { color } = require('../lib/color.js');
//const { dbURI } = require('../lib/settings');

const uri = 'mongodb+srv://ajifu917:ajifu917@atlascluster.sws1np9.mongodb.net/?retryWrites=true&w=majority';
function connectMongoDb() {
  mongoose.connectMongoDb(uri).then(() => {
    console.log(color('[INFO] Connect to DB success!', 'red'));
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports.connectMongoDb = connectMongoDb;
