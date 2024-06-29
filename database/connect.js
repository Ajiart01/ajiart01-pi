const mongoose = require('mongoose');
const { color } = require('../lib/color.js');

// URL koneksi MongoDB Atlas yang diperbarui
const uri = 'mongodb+srv://ajifu917:ajifu917@atlascluster.sws1np9.mongodb.net/myDatabase?retryWrites=true&w=majority';

function connectMongoDb() {
    mongoose.connect(uri, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Tingkatkan timeout koneksi
        socketTimeoutMS: 45000,         // Menambahkan timeout soket
        writeConcern: {
            w: 'majority',
            wtimeout: 5000,
        },
    })
    .then(() => {
        console.log(color('[INFO] Connect to DB success!','red'));
    })
    .catch((error) => {
        console.error('Connection error:', error);
    });

    const db = mongoose.connection;
    db.on('error', (error) => {
        console.error('Connection error:', error);
    });
    db.once('open', () => {
        console.log('Database connected');
    });
}

module.exports.connectMongoDb = connectMongoDb;
