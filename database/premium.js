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
        console.error('Error adding premium:', err);
    }
}
module.exports.addPremium = addPremium;

async function ExpiredTime() {
    try {
        let users = await User.find({});
        for (const data of users) {
            let { premium, defaultKey, username } = data;
            if (premium && Date.now() >= premium) {
                await User.updateOne(
                    { username: username },
                    { apikey: defaultKey, premium: null, limit: limitCount }
                );
                console.log(`Masa Premium ${username} sudah habis`);
            }
        }
    } catch (err) {
        console.error('Error expiring premium time:', err);
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
        console.error('Error deleting premium:', err);
    }
}
module.exports.deletePremium = deletePremium;

async function checkPremium(username) {
    try {
        let user = await User.findOne({ username: username });
        return user && user.premium !== null;
    } catch (err) {
        console.error('Error checking premium:', err);
        return false;
    }
}
module.exports.checkPremium = checkPremium;

async function changeKey(username, key) {
    try {
        await User.updateOne({ username: username }, { apikey: key });
    } catch (err) {
        console.error('Error changing key:', err);
    }
}
module.exports.changeKey = changeKey;

async function resetOneLimit(username) {
    try {
        let user = await User.findOne({ username: username });
        if (user) {
            await User.updateOne({ username: username }, { limit: limitCount });
        }
    } catch (err) {
        console.error('Error resetting limit:', err);
    }
}
module.exports.resetOneLimit = resetOneLimit;

async function getTotalUser() {
    try {
        let users = await User.find({});
        return users.length;
    } catch (err) {
        console.error('Error getting total users:', err);
        return 0;
    }
}
module.exports.getTotalUser = getTotalUser;

async function addUtil() {
    try {
        let utils = await Utils.find({});
        if (utils.length === 0) {
            let obj = { total: 0, today: 0, visitor: 1, util: 'util' };
            await Utils.create(obj);
            console.log(`[INFO] Utils Created!`);
        }
    } catch (err) {
        console.error('Error adding util:', err);
    }
}
module.exports.addUtil = addUtil;

async function getTotalReq() {
    try {
        let utils = await Utils.find({});
        return utils[0].total;
    } catch (err) {
        console.error('Error getting total requests:', err);
        return 0;
    }
}
module.exports.getTotalReq = getTotalReq;

async function getTodayReq() {
    try {
        let utils = await Utils.find({});
        return utils[0].today;
    } catch (err) {
        console.error('Error getting today requests:', err);
        return 0;
    }
}
module.exports.getTodayReq = getTodayReq;

async function getVisitor() {
    try {
        let utils = await Utils.find({});
        return utils[0].visitor;
    } catch (err) {
        console.error('Error getting visitors:', err);
        return 0;
    }
}
module.exports.getVisitor = getVisitor;

async function addRequest() {
    try {
        let utils = await Utils.find({});
        if (utils[0]) {
            utils[0].today += 1;
            utils[0].total += 1;
            await Utils.updateOne({ util: 'util' }, { total: utils[0].total, today: utils[0].today });
        }
    } catch (err) {
        console.error('Error adding request:', err);
    }
}
module.exports.addRequest = addRequest;

async function addVisitor() {
    try {
        let utils = await Utils.find({});
        if (utils[0]) {
            utils[0].visitor += 1;
            await Utils.updateOne({ util: 'util' }, { visitor: utils[0].visitor });
        }
    } catch (err) {
        console.error('Error adding visitor:', err);
    }
}
module.exports.addVisitor = addVisitor;

async function resetTodayReq() {
    try {
        let utils = await Utils.find({});
        if (utils[0]) {
            utils[0].today = 0;
            await Utils.updateOne({ util: 'util' }, { today: utils[0].today });
        }
    } catch (err) {
        console.error('Error resetting today requests:', err);
    }
}
module.exports.resetTodayReq = resetTodayReq;
