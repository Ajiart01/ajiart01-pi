const mongoose = require('mongoose');
const { color } = require('../lib/color.js');
// const { dbURI } = require('../lib/settings');
const uri = 'mongodb+srv://ajifu917:ajifu917@atlascluster.sws1np9.mongodb.net/?retryWrites=true&w=majority';

function connectMongoDb() {
   mongoose.connect(uri, { 
       useNewUrlParser: true,
       useUnifiedTopology: true,
       serverSelectionTimeoutMS: 30000, // Tambahkan ini untuk mengatur timeout koneksi
       writeConcern: {
           w: 'majority',
           wtimeout: 5000,
       },
   });
   
   const db = mongoose.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', () => {
      console.log(color('[INFO] Connect to DB success!','red'));
   });
};

module.exports.connectMongoDb = connectMongoDb;
