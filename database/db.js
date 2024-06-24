const { limitCount, limitPremium } = require('../lib/settings');
const { User } = require('./model');

function waktu(seconds) { 
seconds = Number(seconds / 1000); 
var d = Math.floor(seconds / (3600 * 24)); 
var h = Math.floor(seconds % (3600 * 24) / 3600); var m = Math.floor(seconds % 3600 / 60); 
var s = Math.floor(seconds % 60); 
var dDisplay = d > 0 ? d + (d == 1 ? " Days,":" Days,") : ""; 
var hDisplay = h > 0 ? h + (h == 1 ? " Hours,":" Hours,") : ""; 
var mDisplay = m > 0 ? m + (m == 1 ? " Minutes,":" Minutes,") : ""; 
var sDisplay = s > 0 ? s + (s == 1 ? " Seconds,":" Seconds") : ""; 
return dDisplay + hDisplay + mDisplay + sDisplay; 
}

    async function addUser(username, password, apikey, email) {
        let obj = { username, password, apikey, defaultKey: apikey, premium: null, limit: limitCount, email: email };
        User.create(obj);
    }
    module.exports.addUser = addUser

    async function checkUsername(username) {
        let users = await User.findOne({username: username});
        if(users !== null) {
            return users.username;
        } else {
            return false;
        }
    }
    module.exports.checkUsername = checkUsername;

    async function getApikey(id) {
        let users = await User.findOne({_id: id});
        return {apikey: users.apikey, username: users.username};
    }
    module.exports.getApikey = getApikey;

    async function cekKey(apikey) {
        let db = await User.findOne({apikey: apikey});
        if(db === null) {
            return false;
        } else {
            return db.apikey;
        }
    }
    module.exports.cekKey = cekKey;

 async function getres(id) {
        let users = await User.findOne({apikey: id});
        premium = users.premium == null ? false : true
        return {apikey: users.apikey, email: users.email, username: users.username, limit: users.limit, premium: premium, expired: waktu(users.premium - Date.now()) };
    }
    module.exports.getres = getres;  
    
    async function cekprem(apikey) {
      let users = await User.findOne({username: username});
      //  let db = await User.findOne({apikey: apikey});
        if(users.premium === null) {
            return false;
        } else {
            return users.username;
        }
    }
    module.exports.cekprem = cekprem;

    async function limitAdd(apikey) {
        let key = await User.findOne({apikey: apikey});
        let min = key.limit - 1;
        User.updateOne({apikey: apikey}, {limit: min}, function (err, res) {
            if (err) throw err;
        })
    }
    module.exports.limitAdd = limitAdd

    async function checkLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        return key.limit;
    }
    module.exports.checkLimit = checkLimit;

    async function isLimit(apikey) {
        let key = await User.findOne({apikey: apikey});
        if (key.limit <= 0){
            return true;
        } else {
            return false;
        }
    }
    module.exports.isLimit = isLimit

    async function resetAllLimit() {
        let users = await User.find({});
        users.forEach(async(data) => {
            let { premium, username } = data
            if (premium !== null) {
                return User.updateOne({username: username}, {limit: limitPremium}, function (err, res) {
                    if (err) throw err;
                })   
            } else {
                return User.updateOne({username: username}, {limit: limitCount}, function (err, res) {
                    if (err) throw err;
                })
            }
        })
    }
    module.exports.resetAllLimit = resetAllLimit


    async function getPassword(email) {
        let user = await User.findOne({email: email});
        return user.password;
    }
    module.exports.getPassword = getPassword;

    async function changePass(email, pass) {
        let user = await User.findOne({email: email})
        if (user) {
            User.updateOne({email: email}, {password: pass}, function (err, res) {
                if (err) throw err;
            })
        }
    }
    module.exports.changePass = changePass