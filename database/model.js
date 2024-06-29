const mongoose = require('mongoose');
const { expiredTokenDb } = require('../lib/settings');

// Skema Users
const UsersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apikey: { type: String, required: true, unique: true },
    defaultKey: { type: String, required: true },
    premium: { type: Date, default: null },
    limit: { type: Number, default: limitCount },
    email: { type: String, required: true, unique: true },
}, { versionKey: false, timestamps: true });
module.exports.User = mongoose.model('User', UsersSchema);

// Skema Utils
const UtilsSchema = new mongoose.Schema({
    total: { type: Number, default: 0 },
    today: { type: Number, default: 0 },
    visitor: { type: Number, default: 0 },
    util: { type: String, default: 'util', unique: true },
}, { versionKey: false });
module.exports.Utils = mongoose.model('Util', UtilsSchema);

// Skema Token
const TokenSchema = new mongoose.Schema({
    token: { type: String, required: true, unique: true },
    expire_at: {
        type: Date,
        default: Date.now,
        expires: expiredTokenDb,
    }
}, { versionKey: false });
module.exports.Token = mongoose.model('Token', TokenSchema);
