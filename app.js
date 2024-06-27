__path = process.cwd()
//==========[Module Api]=========\\
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const fetch = require('node-fetch');
const { performance } = require('perf_hooks');
const schedule = require('node-schedule');
const MemoryStore = require('memorystore')(session);
const rateLimit = require("express-rate-limit");
const figlet = require("figlet");
const cfonts = require("cfonts");
const cron = require('node-cron');
const bcryptjs = require('bcryptjs');
const passwordValidator = require('password-validator');

//============[ Username Admin ]=============\\
const myusername = 'ajiart01'

//============[Summon File Routers]=========\\
const apiRouters = require('./routes/api');
const userRouters = require('./routes/users');
//const premiumRouters = require('./routes/premium');
const authRouters = require('./routes/email');
const { User } = require("./database/model");

//==============[Summon File]=========\\
const { isAuthenticated } = require('./lib/auth');
const { connectMongoDb } = require('./database/connect');
const { checkUsername, getApikey, resetLimit, resetAllLimit } = require('./database/db');
const { port, limitCount } = require('./lib/settings');
const { runtime, muptime } = require('./lib/myfunc')
const { color, bgcolor } = require('./lib/color');
const { ignoreFavicon } = require('./lib/function');
const { ExpiredTime, getTotalReq, getTodayReq, getVisitor, getTotalUser, addRequest, addVisitor, addUtil, resetTodayReq, addPremium, deletePremium, tokens, checkPremium, changeKey, resetOneLimit } = require('./database/premium');

//==============[Function]=============\\
const PORT = process.env.PORT || port;

connectMongoDb();
addUtil();

app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5000, 
  message: 'Oops too many requests'
});
app.use(limiter);

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));

app.use(ignoreFavicon);

app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use(function(req, res, next) {
  getTotalUser()
  addRequest();
  next();
  
})

//==========[Tampilan Awal]=========\\
app.get("/", async (req, res) => {
	res.sendFile(__path + "/views/index.html");
});

//==========[Halaman Awal]===========\\
app.get('/docs',  isAuthenticated,async (req, res) => { 
  addVisitor()
  let { apikey, username, limit, email } = req.user
  let total = await getTotalReq()
  let today = await getTodayReq()
  let visitor = await getVisitor()
  let userTotal = await getTotalUser()
  res.render('pages/docs', {
    limit: limit,
    total: total,
    today,
    visitor,
    userTotal,
    username: username,
    apikey: apikey,
    email: email,
    androUser: req.headers["sec-ch-ua-platform"],
    layout: 'layouts/main'
  });
});

//=========[ PRICE]===========\\
app.get('/price',isAuthenticated, async (req, res) => {
   let getkey =  await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('pages/price', {
     apikey: apikey,
    username,
    layout: 'layouts/price'
  })
})

app.get('/changelog',isAuthenticated, async (req, res) => {
   let getkey =  await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('pages/changelog', {
     apikey: apikey,
    username,
    layout: 'layouts/changelog'
  })
})


//==============[ PROFILE & SETTINGS ]===========\\
app.get("/profile", isAuthenticated, async (req, res) => {
	const Users = req.user; 	
	let identifikasiMember = 'Powered By BGSBOT ENTERTAINMENT'; 

	res.render('pages/profile', {
		member: identifikasiMember,
		username: Users.username,
		email: Users.email,	
		apikey: Users.apikey,	
		limit: Users.limit,	
		url: Users.url,	
		premium: Users.premium,	
		//expired: getres,
		layout: 'layouts/profile'
	});
});

//=================[ BOT & GC BOT ]==========\\
app.get("/botwa", async (req, res) => {
	res.sendFile(__path + "/views/botwa.html");
});

app.get("/gcbot", async (req, res) => {
	res.sendFile(__path + "/views/gcbot.html");
});

//===============[ REPORT BUG ]===========\\
app.get('/report-bug', (req, res) => {
    res.sendFile(__path + '/views/report-bug.html')
})

//================[Main]=============\\
//===========[Statistic]===========\\
app.get('/main/statistic', async (req, res, next) => {
const date = new Date
const hour = date.getHours()
const minute = date.getMinutes()
const second = date.getSeconds()
const neww = performance.now()
const old = performance.now()
const ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
const cpu = require('os').cpus()
    status = {
        status: true,
        memory: ram,
        cpu: cpu,       
        time: `${hour} : ${minute} : ${second}`,        
        speed: `${old - neww}ms`,
        info:{       
            author: 'BGS BOT ENTERTAINMENT'
        }
    }
    res.json(status)
})

//=============[Runtime]===========\\
app.get('/main/runtime', async (req, res, next) => {
	runtim = {
		status: true,
		runtime: runtime(process.uptime()),
		info:{       
            author: 'BGS BOT ENTERTAINMENT'            
        }
    }
    res.json(runtim)
})

//==========[Uptime]===========\\
app.get('/main/uptime', async (req, res, next) => {
	uptim = {
		status: true,
		uptime: muptime(process.uptime()),
		info:{       
            author: 'BGS BOT ENTERTAINMENT'            
        }
    }
    res.json(uptim)
})

//================[Control Admin]========\\
app.get('/listuser', isAuthenticated, async (req, res) => {
  let { username, email } = req.user
  let getkey = await getApikey(req.user.id)
  let { apikey } = getkey
  let List = await User.find({})
  if (username !=='ajiart01') {
		req.flash("error_msg", "Anda Bukan Owner Rest Api!!!");
		res.redirect("/docs");
	} else {
  res.render('premium/listuser', {
       List,
       username,
       email,
       apikey,       
       layout: 'layouts/admin/listuser'
  })
  }
})

//================[Premium]==========\\
app.get('/premium', isAuthenticated, async (req, res) => {
let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
	if( username !== myusername ) {
		req.flash("error_msg", "Anda Bukan Owner Rest Api!!!");
		res.redirect("/docs");
	} else {
    res.render('premium/index',  {
    apikey,
    username,
        layout: 'layouts/premium'
    });
    }
});

app.get('/addprem', isAuthenticated, async (req, res) => {
let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
    res.render('premium/index',  {
    apikey,
    username,
        layout: 'layouts/premium'
    });
});

app.post('/addprem', async (req, res) => {
    let { username, expired, customKey, token } = req.body;
    if (token != tokens) {
        req.flash('error_msg', 'Invalid Token');
        return res.redirect('/addprem');
    }
    let checking = await checkUsername(username);
    if (!checking) {
        req.flash('error_msg', 'Username is not registered');
        return res.redirect('/addprem');
    } else {
        let checkPrem = await checkPremium(username)
        if (checkPrem) {
            req.flash('error_msg', 'Username is alredy Premium before');
            return res.redirect('/addprem');
        } else {
            addPremium(username, customKey, expired)
            req.flash('success_msg', `Succes Added Premium ${username}`);
            return res.redirect('/premium');
        }
    }
})

app.get('/delprem', isAuthenticated, async (req, res) => {
   let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
     res.render('premium/index',  {
       apikey,
       username,
        layout: 'layouts/premium'
    });
});

app.post('/delprem', async (req, res) => {
    let { username, token } = req.body;
    if (token != tokens) {
        req.flash('error_msg', 'Invalid Token');
        return res.redirect('/delprem');
    }
    let checking = await checkUsername(username);
    if (!checking) {
        req.flash('error_msg', 'Username is not registered');
        return res.redirect('/delprem');
    } else {
        let checkPrem = await checkPremium(username)
        if (checkPrem) {
            deletePremium(username);
            req.flash('success_msg', `Succes Delete Premium ${username}`);
            return res.redirect('/premium');
        } else {
            req.flash('error_msg', 'Username is not Premium');
            return res.redirect('/delprem');
        }
    };
});

app.get('/custom-key', isAuthenticated, async (req, res) => {
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
      res.render('premium/index',  {
        apikey,
        username,
        layout: 'layouts/premium'
    });
})

app.post('/custom-key', isAuthenticated, async (req, res) => {
    let { customKey } = req.body;
    let { username } = req.user
    let checkPrem = await checkPremium(username);
    if (checkPrem) {
        changeKey(username, customKey)
        req.flash('success_msg', `Succes Custom Apikey ${customKey}`);
        return res.redirect('/premium');
    } else {
        req.flash('error_msg', 'Youre not Premium');
        return res.redirect('/premium');
    }
})

app.get('/limit-key', isAuthenticated, async (req, res) => {
   let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
     res.render('premium/index',  {
     apikey,
     premium,
        layout: 'layouts/premium'
    });
})

app.post('/limit-key', async (req, res) => {
    let { username, token } = req.body;
    if (token != tokens) {
        req.flash('error_msg', 'Invalid Token');
        return res.redirect('/limit-key');
    }
    let reset = await checkPremium(username);
    if (!reset) {
        resetOneLimit(username)
        req.flash('success_msg', `Succes Reset Limit Apikey User ${username} to ${limitCount}`);
        return res.redirect('/premium');
    } else {
        req.flash('error_msg', 'Cannot Reset Premium Apikey');
        return res.redirect('/limit-key');
    }
})

app.get('/resetall', isAuthenticated, async (req, res) => {
    let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
    res.render('premium/index',  {
    apikey,
    username,
        layout: 'layouts/premium'
    });
})

app.post('/resetall', (req, res) => {
    let { token } = req.body;
    if (token != tokens) {
        req.flash('error_msg', 'Invalid Token');
        return res.redirect('/premium');
    } else {
        resetAllLimit();
        resetTodayReq();
        req.flash('success_msg', `Succes Reset Limit All Apikey`);
        return res.redirect('/premium');
    }
})


///===========[Api 😙]===========\\
app.get('/download', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/download', {
      apikey: apikey,
    username,
    audio: `https://a.top4top.io/m_2622ceshc1.mp3`,
    layout: 'layouts/list/download'
  }); 
});

app.get('/search', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/search', {
      apikey: apikey,
    username,
    audio: `https://b.top4top.io/m_2622d864v2.mp3`,
    layout: 'layouts/list/search'
  });
});

app.get('/animanga', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/animanga', {
      apikey: apikey,
    username,
    audio: `https://beta.lannganz.repl.co/upload/eb115129547c160552344084e95129af.bin`,
    layout: 'layouts/list/animanga'
  });
});

app.get('/anime', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/anime', {
      apikey: apikey,
    username, 
    layout: 'layouts/list/anime'
  });
});

app.get('/nsfw', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/nsfw', {
      apikey: apikey,
    username,
    audio: `https://b.top4top.io/m_2622d864v2.mp3`,
    layout: 'layouts/list/nsfw'
  });
});

app.get('/stalk', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/stalk', {
      apikey: apikey,
    username,
    audio: `https://b.top4top.io/m_2622d864v2.mp3`,
    layout: 'layouts/list/stalk'
  });
});

app.get('/creator', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/creator', {
      apikey: apikey,
    username,
    audio: `https://beta.lannganz.repl.co/upload/eb115129547c160552344084e95129af.bin`,
    layout: 'layouts/list/creator'
  });
});

app.get('/entertainment', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/entertainment', {
      apikey: apikey,
    username,
    audio: `https://l.top4top.io/m_2622c43bt0.mp3`,
    layout: 'layouts/list/entertainment'
  });
});

app.get('/primbon', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/primbon', {
      apikey: apikey,
    username,
    audio: `https://a.top4top.io/m_2622kz8o30.mp3`,
    layout: 'layouts/list/primbon'
  });
});


app.get('/other', isAuthenticated, async (req, res) => { 
  let getkey = await getApikey(req.user.id)
  let { apikey,username } = getkey
  res.render('api/other', {
      apikey: apikey,
    username,
    audio: `https://b.top4top.io/m_2622d864v2.mp3`,
    layout: 'layouts/list/other'
  });
});

//============[Summon Router]===========\\
app.use('/api', apiRouters);
app.use('/users', userRouters);
//app.use('/premium', premiumRouters);
app.use('/auth', authRouters);

//===========[Function]===============\\
app.set('json spaces', 4);

app.use(function (req, res) {

    res.status(200)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/200.html');
});

//===========[Tampilan Logs]==========\\
app.listen(PORT, () => {
  cfonts.say('BGS BOT Api', {
	font: 'block',
    gradient: ['red','magenta'],
    align: 'center',
	})
	cfonts.say(`Created By Bgsbot`, {
	font: 'console',
	align: 'center',
	gradient: ['red', 'magenta']
	})
  console.log(color(`Example app listening at http://localhost:${PORT}`,'yellow'));
  console.log(color(`My Project Website https://bgsbot.my.id`,'blue'));
  console.log(color(`Website Online!`,'red'));
 
  //=========[Reset Prem]=========\\
  schedule.scheduleJob('* * * * *', () => { 
    ExpiredTime()
  });

//================[Function Reset]===========\\
cron.schedule('0 0 0 * * *', () => {
    resetTodayReq()
      resetAllLimit()
  }, {
    scheduled: true,
    timezone: "Asia/Jakarta"
  });

});


