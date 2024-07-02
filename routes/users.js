const express = require('express');
const router = express.Router();
const passport = require('passport');
const { site_key, secret_key, host, myEmail } = require('../lib/settings');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const ejs = require('ejs');

const Recaptcha = require('express-recaptcha').RecaptchaV2;
const recaptcha = new Recaptcha(site_key, secret_key);

const { getHashedPassword, randomText, getWaktu, addWaktu, generateAuthToken } = require('../lib/function');
const { checkUsername, addUser, getPassword, changePass, getres, getApikey } = require('../database/db');
const { isAuthenticated, notAuthenticated, captchaRegister, captchaLogin } = require('../lib/auth');
const { checkEmail, addToken } = require('../database/email');
const { Token } = require('../database/model');
const { ExpiredTime } = require('../database/premium');
const { sendEmail } = require('../lib/sendEmail');
const fs = require('fs')
const chalk = require('chalk')

const {
	uploadByBuffer
} = require("../controllers/uploader");

const {
	User
} = require("../database/model");
let tokenize = new Array();

router.get("/", async (req, res) => {
	res.sendFile(process.cwd() + "/views/index.html");
});


router.get('/login', notAuthenticated, (req, res) => {
    res.render('login', {
        //recaptcha: res.recaptcha,
        layout: 'layouts/users'
    });
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/docs',
        failureRedirect: '/users/login',
        failureFlash: true,
    })(req, res, next);
});

router.get('/register', (req, res) => {
    res.render('register', {
       // recaptcha: res.recaptcha,
        layout: 'layouts/users'  
    });
});

router.post('/register', async (req, res) => {
    try {
        // const cd = 3.6e+6
        // const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        // const lastReq = getWaktu(ip)
        // if (lastReq !== undefined && cd - (Date.now() - lastReq) > 0) {
        //     const time = ms(cd - (Date.now() - lastReq));
        //     req.flash('error_msg', `Oops you have registered before, please wait ${time.minutes} minutes to register again`);
        //     return res.redirect('/users/register');
        // }
        let {username, email, password, confirmPassword } = req.body;
        if (password.length < 6 || confirmPassword < 6) {
            req.flash('error_msg', 'Password must be at least 6 characters');
            res.redirect('/users/register');
        }
        if (password === confirmPassword) {
            let checking = await checkUsername(username);
            let checking2 = await checkEmail(email);
            if(checking || checking2) {
                req.flash('error_msg', 'A user with the same Username or Email already exists');
                res.redirect('/users/register');
            } else {
                if (!email.includes('@gmail')) {
                    req.flash('error_msg', 'Please use Gmail');
                    return res.redirect('/users/register');
                }
                let token = generateAuthToken()
                addToken(token)
                let url = `${host}/users/verifacc?username=${username}&email=${email}&token=${token}&password=${password}`
                let split = url.split('?')[1]
                let a = cryptr.encrypt(split)
                let urlFix = `${host}/users/verifacc?${a}`
                const data = await ejs.renderFile("./views/email/inEmail2.ejs", {
                    url: urlFix,
                });
                let templateEmail= {
                    from: myEmail,
                    to: email,
                    subject: 'Verify Email Marin Kitagawa Api',
                    text: 'Marin Kitagawa Api',
                    html: data,
                }
                let path1 = '/users/register'
                let path2 = `/users/register`
                sendEmail(templateEmail, req, res, path1, path2)
                // addWaktu(ip);
            }
        } else {
            req.flash('error_msg', 'Password does not match.');
            res.redirect('/users/register');
        }
    } catch(err) {
        console.log(err);
    }
})

router.get('/verifacc', async (req, res) => {
    let url = req.originalUrl
    let splits = url.split('?')[1]
    try {
        var b = cryptr.decrypt(splits);
    } catch (error) {
        req.flash('error_msg', 'Invalid Request, Make Sure You Have Clicked on the URL in Your Email');
        return res.redirect('/users/register');
    }

    let username = b.split('username=')[1].split('&email=')[0];
    let email = b.split('&email=')[1].split('&token=')[0];
    let token = b.split('&token=')[1].split('&password=')[0];
    let password = b.split('&password=')[1];
    let find =  Token.findOne({token: token})
    if (!find) {
        req.flash('error_msg', 'Invalid Token or Token Expired, Register Again');
        return res.redirect('/users/register');
    } else {
        let hashedPassword = getHashedPassword(password);
        let apikey = randomText(8);
        addUser(username, hashedPassword, apikey, email);
        req.flash('success_msg', 'You are now registered and can login');
        res.redirect('/users/login');
    }
})

router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/users/login');
});



router.post('/changepass', async(req, res) => {
    let { email, password, newpassword, confirmpassword } = req.body;
    let getPass = getHashedPassword(password);
    let oldPass =  getPassword(email);
    if (getPass != oldPass) {
        req.flash('error_msg', 'Invalid Old Password');
        return res.redirect('/auth/emailchange');
    } else {
        if (newpassword === confirmpassword) {
            let hashedPassword = getHashedPassword(newpassword);
            changePass(email, hashedPassword);
            req.flash('success_msg', 'Success Change New Password');
            res.redirect('/docs');
        } else {
            req.flash('error_msg', 'New Password does not match.');
            res.redirect('/auth/emailchange');
        }
    }
})



/*router.post("/settings", isAuthenticated, async (req, res) => {
	const users = req.user;
	const { username, apikey } = req.user;
	let profile;
	if (req.files) profile = req.files.profile;
	else profile = undefined;
	if (username.length <= 1 && apikey.length <= 1 && profile == undefined) {
		req.flash("warning_msg", "input tidak boleh kosong semua");
		res.redirect("/users/settings");
	} else if ((username.length >= 1 && username !== users.username) && (apikey.length <= 1 || apikey == users.apikey) && !profile) {
		 User.findOneAndUpdate({ _id: users.id }, { username: username });
		req.flash("success_msg", "sukses update username");
		res.redirect("/users/profile");
	} else if (((username.length >= 1 && username == users.username) || username.length < 1) && (apikey.length >= 1 && apikey !== users.apikey) && !profile) {
		 User.findOneAndUpdate({ _id: users.id }, { apikey: apikey });
		req.flash("success_msg", "sukses update apikey");
		res.redirect("/users/profile");
	} else if ((username.length >= 1 && username !== users.username) && (apikey.length >= 1 && apikey !== users.apikey) && !profile) {
		 User.findOneAndUpdate({ _id: users.id }, { username: username, apikey: apikey });
		req.flash("success_msg", "sukses update username & apikey");
		res.redirect("/users/profile");
	} else if ((username.length >= 1 && username !== users.username) && ((apikey.length >= 1 && apikey == users.apikey) || apikey.length < 1) && profile !== undefined) {
		if (!/image|images/.test(profile.mimetype)) {
			req.flash("error_msg", "Only Images");
			res.redirect("/users/settings");
		} else {
			uploadByBuffer(profile.data, profile.mimetype)
				.then(async ({ link }) => {
					 User.findOneAndUpdate({ _id: users.id }, { username: username, url: link });
					req.flash("success_msg", "sukses update username & profile");
					res.redirect("/users/profile");
				}).catch(e => {
					req.flash("error_msg", String(e));
					res.redirect("/users/profile");
				});
		}
	} else if (((username.length >= 1 && username == users.username) || username.length < 1) && (apikey.length >= 1 && apikey !== users.apikey) && profile !== undefined) {
		if (!/image|images/.test(profile.mimetype)) {
			req.flash("error_msg", "Only Images");
			res.redirect("/users/settings");
		} else {
			uploadByBuffer(profile.data, profile.mimetype)
				.then(async ({ link }) => {
					 User.findOneAndUpdate({
						_id: users.id
					}, { apikey: apikey, url: link });
					req.flash("success_msg", "sukses update apikey & profile");
					res.redirect("/users/profile");
				}).catch(e => {
					req.flash("error_msg", String(e));
					res.redirect("/users/settings");
				});
		}
	} else if (((username.length >= 1 && username == users.username) || username.length < 1) && ((apikey.length >= 1 && apikey == users.apikey) || apikey.length < 1) && profile !== undefined) {
		if (!/image|images/.test(profile.mimetype)) {
			req.flash("error_msg", "Only Images");
			res.redirect("/users/settings");
		} else {
			uploadByBuffer(profile.data, profile.mimetype)
				.then(async ({ link }) => {
					 User.findOneAndUpdate({
						_id: users.id
					}, { url: link });
					req.flash("success_msg", "sukses update profile");
					res.redirect("/users/profile");
				}).catch(e => {
					req.flash("error_msg", String(e));
					res.redirect("/users/settings");
				});
		}
	} else if ((username.length >= 1 && username !== users.username) && (apikey.length >= 1 && apikey !== users.apikey) && profile !== undefined) {
		if (!/image|images/.test(profile.mimetype)) {
			req.flash("error_msg", "Only Images");
			res.redirect("/users/settings");
		} else {
			uploadByBuffer(profile.data, profile.mimetype)
				.then(async ({ link }) => {
					 User.findOneAndUpdate({ _id: users.id }, {
						username: username,
						apikey: apikey,
						url: link
					});
					req.flash("success_msg", "sukses update username & apikey & profile");
					res.redirect("/users/profile");
				}).catch(e => {
					req.flash("error_msg", String(e));
					res.redirect("/users/settings");
				});
		}
	} else {
		req.flash("warning_msg", "Pilih salah satu yang mau diubah.");
		res.redirect("/users/settings");
	}

});*/


module.exports = router;
