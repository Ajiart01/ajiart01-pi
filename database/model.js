const mongoose = require('mongoose');
const { expiredTokenDb } = require('../lib/settings');

const Users = mongoose.Schema({
    username: { type: String },
    password: { type: String},
    apikey: { type: String },
    defaultKey: { type: String },
    premium: { type: String },
    limit: { type: Number },
    email: { type: String },
}, { versionKey: false });
module.exports.User = mongoose.model('api2', Users);

const Utils = mongoose.Schema({
    total: { type: Number },
    today: { type: Number },
    visitor: { type: Number },
    util: { type: String }
}, { versionKey: false });
module.exports.Utils = mongoose.model('util', Utils);

const Token = mongoose.Schema({
    token: { type: String },
    expire_at: {
        type: Date,
        default: Date.now,
        expires: expiredTokenDb,
    }
}, { versionKey: false });
module.exports.Token = mongoose.model('token', Token);