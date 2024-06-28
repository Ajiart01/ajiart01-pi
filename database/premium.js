const { User, Utils } = require('./model');
const toMs = require('ms');
const { limitCount, limitPremium } = require('../lib/settings');
const tokens = 'ajiart01';
module.exports.tokens = tokens;

async function addPremium(username, customKey, expired) {
    try {
        await User.updateOne(
            { username: username },
            { apikey: customKey, premium: Date.now() + toMs(expired), limit: limitPremium }
        );
    } catch (err) {
        console.error('Error in addPremium:', err);
    }
}
module.exports.addPremium = addPremium;

async function ExpiredTime() {
    try {
        let users = await User.find({});
        for (const data of users) {
            const { premium, defaultKey, username } = data;
            if (premium && Date.now() >= premium) {
                await User.updateOne(
                    { username: username },
                    { apikey: defaultKey, premium: null, limit: limitCount }
                );
                console.log(`Masa Premium ${username} sudah habis`);
            }
        }
    } catch (err) {
        console.error('Error in ExpiredTime:', err);
    }
}
module.exports.ExpiredTime = ExpiredTime;

async function deletePremium(username) {
    try {
        let user = await User.findOne({ username: username });
        if (user) {
            await User.updateOne(
                { username: username },
                { apikey: user.defaultKey, premium: null, limit: limitCount }
            );
        }
    } catch (err) {
        console.error('Error in deletePremium:', err);
    }
}
module.exports.deletePremium = deletePremium;

async function checkPremium(username) {
    try {
        let user = await User.findOne({ username: username });
        return user && user.premium !== null;
    } catch (err) {
        console.error('Error in checkPremium:', err);
        return false;
    }
}
module.exports.checkPremium = checkPremium;

async function changeKey(username, key) {
    try {
        await User.updateOne({ username: username }, { apikey: key });
    } catch (err) {
        console.error('Error in changeKey:', err);
    }
}
module.exports.changeKey = changeKey;

async function resetOneLimit(username) {
    try {
        await User.updateOne({ username: username }, { limit: limitCount });
    } catch (err) {
        console.error('Error in resetOneLimit:', err);
    }
}
module.exports.resetOneLimit = resetOneLimit;

/* UTILS, TOTAL REQ ETC */

async function getTotalUser() {
    try {
        let users = await User.find({});
        return users.length;
    } catch (err) {
        console.error('Error in getTotalUser:', err);
        return 0;
    }
}
module.exports.getTotalUser = getTotalUser;

async function addUtil() {
    try {
        let db = await Utils.find({});
        if (db.length === 0) {
            let obj = { total: 0, today: 0, visitor: 1, util: 'util' };
            await Utils.create(obj);
            console.log('[INFO] Utils Created!');
        }
    } catch (err) {
        console.error('Error in addUtil:', err);
    }
}
module.exports.addUtil = addUtil;

async function getTotalReq() {
    try {
        let db = await Utils.find({});
        return db.length > 0 ? db[0].total : 0;
    } catch (err) {
        console.error('Error in getTotalReq:', err);
        return 0;
    }
}
module.exports.getTotalReq = getTotalReq;

async function getTodayReq() {
    try {
        let db = await Utils.find({});
        return db.length > 0 ? db[0].today : 0;
    } catch (err) {
        console.error('Error in getTodayReq:', err);
        return 0;
    }
}
module.exports.getTodayReq = getTodayReq;

async function getVisitor() {
    try {
        let db = await Utils.find({});
        return db.length > 0 ? db[0].visitor : 0;
    } catch (err) {
        console.error('Error in getVisitor:', err);
        return 0;
    }
}
module.exports.getVisitor = getVisitor;

async function addRequest() {
    try {
        let db = await Utils.find({});
        if (db.length > 0) {
            db[0].today += 1;
            db[0].total += 1;
            await Utils.updateOne({ util: 'util' }, { total: db[0].total, today: db[0].today });
        }
    } catch (err) {
        console.error('Error in addRequest:', err);
    }
}
module.exports.addRequest = addRequest;

async function addVisitor() {
    try {
        let db = await Utils.find({});
        if (db.length > 0) {
            db[0].visitor += 1;
            await Utils.updateOne({ util: 'util' }, { visitor: db[0].visitor });
        }
    } catch (err) {
        console.error('Error in addVisitor:', err);
    }
}
module.exports.addVisitor = addVisitor;

async function resetTodayReq() {
    try {
        await Utils.updateOne({ util: 'util' }, { today: 0 });
    } catch (err) {
        console.error('Error in resetTodayReq:', err);
    }
}
module.exports.resetTodayReq = resetTodayReq;
