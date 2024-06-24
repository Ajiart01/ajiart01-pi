const { limitCount } = require('../lib/settings');
const { User, Token } = require('./model');

async function validateEmail(user, email) {
    let users = await User.findOne({username: user})
    if (!users) {
        return false
    } else {
        if (users.username == user && users.email == email) {
            return true
        }
    }
}
module.exports.validateEmail = validateEmail

async function addEmail(username, email) {
    User.updateOne({username: username}, {email: email, limit: limitCount + 100}, function (err, res) {
        if (err) throw err;
    })
}
module.exports.addEmail = addEmail

async function changeEmail(email, newemail) {
    let users = await User.findOne({email: email});
    users.email = null
    User.updateOne({email: email}, {email: newemail}, function (err, res) {
        if (err) throw err;
    })
}
module.exports.changeEmail = changeEmail

async function checkEmail(userEmail) {
    let users = await User.findOne({email: userEmail})
    if (!users) {
        return false
    } else {
        return users.email
    }
}
module.exports.checkEmail = checkEmail

/* DATABASE TOKEN */

async function addToken(token, email) {
    let obj = { email: email, token: token };
    Token.create(obj);
}
module.exports.addToken = addToken