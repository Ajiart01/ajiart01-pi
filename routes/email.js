const express = require('express');
const router = express.Router();
const ejs = require("ejs");
const fs = require('fs')
const chalk = require('chalk')
const { generateAuthToken, getHashedPassword } = require('../lib/function');
const { addToken, validateEmail, checkEmail, addEmail, changeEmail } = require('../database/email');
const { host, myEmail, site_key, secret_key } = require('../lib/settings');
const { sendEmail } = require('../lib/sendEmail');
const { isAuthenticated, captchaForgot } = require('../lib/auth');
const Cryptr = require('cryptr');
const bcryptjs = require('bcryptjs');
const passwordValidator = require('password-validator');
const { Token, User } = require('../database/model');
const cryptr = new Cryptr('myTotalySecretKey');

const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(site_key, secret_key);

router.get('/emailchange', isAuthenticated, (req, res) => {
    let { email } = req.user
    res.render('email/inputEmail', {
        email: email,
        layout: 'layouts/users'
    })
})

router.post('/emailchange', async(req, res) => {
    let { email, newemail } = req.body
    if (!req.user) {
        req.flash('error_msg', 'Please login to continue');
        return res.redirect('/users/login');
    }
    if (!email.includes('@gmail') || !newemail.includes('@gmail')) {
        req.flash('error_msg', 'Please use Gmail');
        return res.redirect('/auth/emailchange');
    }
    let exist = await checkEmail(newemail)
    if (exist) {
        req.flash('error_msg', 'The new email has already been used');
        return res.redirect('/auth/emailchange'); 
    } else {
        let token = generateAuthToken()
        addToken(token)
        let url = `${host}/auth/verifyemail?emails=${email}&thenew=${newemail}&token=${token}`
        let split = url.split('?')[1]
        let a = cryptr.encrypt(split)
        let urlFix = `${host}/auth/verifyemail?${a}`
        const data = await ejs.renderFile("./views/email/inEmail2.ejs", {
            url: urlFix,
        });
        let templateEmail= {
            from: myEmail,
            to: newemail,
            subject: 'Change Email bgsbot-Api',
            text: 'bgsbot-Api',
            html: data,
            attachments: [{
                filename: 'fxacb.png',
                path: './public/images/favicon.png',
                cid: 'logo' 
           }]
        }
        let path1 = '/auth/emailchange'
        let path2 = `/docs`
        sendEmail(templateEmail, req, res, path1, path2)
    }
})

router.get('/verifyemail', isAuthenticated, async(req, res) => {
    let url = req.originalUrl
    let splits = url.split('?')[1]
    try {
        var b = cryptr.decrypt(splits);
    } catch (error) {
        req.flash('error_msg', 'Invalid Request, Make Sure You Have Clicked on the URL in Your Email');
        return res.redirect('/auth/emailchange');
    }

    let email = b.split('emails=')[1].split('&thenew=')[0];
    let newemails = b.split('&thenew=')[1].split('&token=')[0];
    let token = b.split('&token=')[1];
    let find = await Token.findOne({token: token})
    if (!find) {
        req.flash('error_msg', 'Invalid Token or Token Expired, Change Email Again');
        return res.redirect('/auth/emailchange');
    } else {
        changeEmail(email, newemails)
        await Token.deleteOne({token: token})
        req.flash('success_msg', `Success Change Email : ${email} to New Email : ${newemails}, Refresh :)`);
        return res.redirect('/docs');
    }
})

router.get('/forgotpass', (req, res) => {
    res.render('email/forgotpass', {
        //recaptcha: res.recaptcha,
        layout: 'layouts/users',
    })
})

router.post('/forgotpass', async(req, res) => {
    let { email, username } = req.body
    let exist = await validateEmail(username, email)
    if (!exist) {
        req.flash('error_msg', 'Username & Email not registered in the Database, or not match');
        return res.redirect('/auth/forgotpass'); 
    } else {
        let token = generateAuthToken()
        addToken(token)
        let url = `${host}/auth/resetpass?email=${email}&token=${token}`      
        const data = await ejs.renderFile("./views/email/inEmail.ejs", {
            url: url,    
            token2: token,        
        });
        let templateEmail= {
            from: myEmail,
            to: email,
            subject: 'Reset Password Bgsbot API',
            text: 'Fxacb-Api',
            html: data,
            attachments: [{
                filename: 'fxacb.png',
                path: './public/images/favicon.png',
                cid: 'logo' 
           }]
        }
        let path1 = '/auth/forgotpass'
        let path2 = `/auth/forgotpass`
        sendEmail(templateEmail, req, res, path1, path2)
    }
})

router.get('/resetpass', async(req, res) => {
    let email = req.query.email;
    let token = req.query.token
    let finds = await Token.findOne({token: token})
    if (!finds) {
        return res.send({status: false, message: 'Invalid Token or Token Expired'})
    } else {
        return res.render('email/resetPass', {
            email: email,
            token: token,
            layout: 'layouts/users'
        })
    }
})

router.post('/resetpass', async(req, res) => {
    let { token, email, password } = req.body
    let finds = await Token.findOne({token: token})
    if (!finds) {
        return res.send({status: false, message: 'Invalid Token or Token Expired'})
    } else {
        const hashedPassword = getHashedPassword(password);
        User.updateOne({email: email}, {password: hashedPassword}, function (err, res) {
            if (err) throw err;
        })
        await Token.deleteOne({token: token})
        req.flash('success_msg', `Success Reset Password`);
        return res.redirect('/users/login');
    }

})

module.exports = router
