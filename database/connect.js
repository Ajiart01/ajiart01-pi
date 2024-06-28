const mongoose = require('mongoose');
const { color } = require('../lib/color.js');
const { dbURI } = require('../lib/settings');

function connectMongoDb() {
  mongoose.connect(dbURI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Waktu tunggu koneksi
    socketTimeoutMS: 45000, // Waktu tunggu soket
    useCreateIndex: true // Pastikan ini berada di dalam objek konfigurasi
  }).then(() => {
    console.log(color('[INFO] Connect to DB success!', 'red'));
  }).catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
  
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

module.exports.connectMongoDb = connectMongoDb;
