const mongoose = require('mongoose');
const { color } = require('../lib/color.js');
const { dbURI } = require('../lib/settings');

function connectMongoDb() {
   mongoose.connect(dbURI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // menambahkan timeout
    })
    .then(() => {
      console.log(color('[INFO] Connect to DB success!','red'));
    })
    .catch(err => {
      console.error(color(`[ERROR] Failed to connect to DB: ${err.message}`, 'red'));
    });
};

module.exports.connectMongoDb = connectMongoDb;
