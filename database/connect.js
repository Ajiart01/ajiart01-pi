const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { color } = require('../lib/color.js');
const { dbURI } = require('../lib/settings');

function connectMongoDb() {
   mongoose.connect(dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('open', () => {
      console.log(color('[INFO] Connect to DB success!','red'));
    });
};

module.exports.connectMongoDb = connectMongoDb;