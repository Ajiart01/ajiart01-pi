const mongoose = require('mongoose');
const mongodb = require('mongodb');
const { color } = require('../lib/color.js');
//const { dbURI } = require('../lib/settings');
const uri = 'mongodb+srv://ajifu917:ajifu917@atlascluster.sws1np9.mongodb.net/?retryWrites=true&w=majority';

function connectMongoDb() {
   mongoose.connect(uri, { 
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('open', () => {
      console.log(color('[INFO] Connect to DB success!','red'));
    });
};

module.exports.connectMongoDb = connectMongoDb;