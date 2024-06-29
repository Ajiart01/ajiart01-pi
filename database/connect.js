const mongoose = require('mongoose');
const { color } = require('../lib/color.js');

// URL koneksi MongoDB Atlas yang diperbarui
const uri = 'mongodb+srv://ajifu917:ajifu917@atlascluster.sws1np9.mongodb.net/myDatabase?retryWrites=true&w=majority';

function connectMongoDb() {
    await mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false
});
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Connection error: ' + err.message));


    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error('Connection error:', error);
    });
    db.once('open', () => {
        console.log('Database connected');
    });
}

module.exports.connectMongoDb = connectMongoDb;
