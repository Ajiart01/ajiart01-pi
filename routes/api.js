__path = process.cwd()
const favicon = require('serve-favicon');
const express = require('express');

//Summon Module Dll 
const creator = "BGS BOT ENTERTAINMENT"
const author = "BGS BOT ENTERTAINMENT"
const neoxr = "yntkts"
const zeks = "administrator"
const zeks2 = "apivinz"
const secure = require('ssl-express-www');
const cors = require('cors');
const Crypto = require("crypto")
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const cookie = require("cookie");
const request = require('request');
const scr = require ('@bochilteam/scraper')
const zrapi = require("zrapi");
const { default: axios, isAxiosError } = require("axios");
const googleIt = require('google-it');
const beta = require("beta-api");
const { convertStringToNumber } = require('convert-string-to-number');
const { tmpdir } = require('os');
const fs = require('fs')
const chalk = require('chalk')
const TikTokScraper = require('tiktok-scraper');
const { Primbon } = require('scrape-primbon');
const primbon = new Primbon();
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const { shortText } = require("limit-text-js");
const hikki = require('hikki-me');
const frieren = require("@xct007/frieren-scraper");
const nekopoi = require('nekopoi-scraper');
const DIG = require('discord-image-generation')
const removebg = require('removebg-id')
const knights = require("knights-canvas")
const Caxinha = require('caxinha')
const yuricanvas = require("yuri-canvas")

const {
    Configuration,
    OpenAIApi,
    openai
} = require("openai");
const router  = express.Router();

//Buat Summon File
const { cekprem, checkLimit, resetLimit, limitAdd, isLimit, cekKey, getres } = require('../database/db'); 
const { checkPremium} = require("../database/premium");
const ch = require('../lib/scraper')
const { instagramdl, instagramdlv2, igdl, igDownloader } = require('../lib/instagram.js')
const otaku = require('../lib/otakudesu.js')
const { dl } = require('../lib/aiovideodl')
const { readFileTxt, readFileJson, toPDF } = require('../lib/function.js');
const { getBuffer, sleep, shorts } = require('../lib/function')
const { User } = require("../database/model");
const { ytDonlodMp3,ytDonlodMp4, ytPlayMp3, ytPlayMp4, ytSearch } = require('../lib/data/yt');
const joox = require("../lib/joox");
const temp = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0,6).toString(36)}`)

const download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

/*
* @Pesan Error
*/
loghandler = {
    notparam: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter apikey'
    },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter url'
    },
    notseri: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer seri'
        },    
         notcomment: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter comment'
    },
     notdisplayname: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter displayname'
    },
     notdog: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter dog'
    },
    notnamaGb: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer namaGb'
        },
        notnama: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer nama'
        },
    notpepeGb: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer pepeGb'
        },
    notpepeUser: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer pepeUser'
        },
    notbege: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer bege'
        },
    nottotalMem: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer totalMem'
        },
    notavatar: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter avatar'
        },
        notprofile: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter profile'
        },
        notname: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter name'
        },
        notneedexp: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter needexp'
        },
        notfound: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: `Result Not Found`
        },
        notcurxp: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter curxp'
        },
        notlevel: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter level'
        },
        notlogorank: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter logorankr'
        },
    notgcname: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer gcname'
        },
    notgcicon: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer gcicon'
        },
    notpp: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer pp'
        },
    notbg: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer bg'
        },
    notmemberCount: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan paramer memberCount'
        },
    notquery: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter query'
        },
    notkata: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter kata'
    },
    notdevice: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter device [desktop-phone-tablet]'
    },
    notfull: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter full off / on'
    },
    nottext: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text'
    },
    nottext2: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text2'
    },
    notnabi: {
        status: false,
        creator: `${creator}`,
        code: 406, 
        message: 'masukan parameter nabi'
    },
    nottext3: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter text3'
    },
    nottheme: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter theme'
    },
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter username'
    },
    notnegara: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter negara'
    },
     notnomor: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter nomor'
    },
    notvalue: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukan parameter value'
    },
    invalidKey: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'apikey invalid'
    },
    succeed: {
        status: false,
        creator: `${creator}`,
        code: 200,
        message: 'succeed'
    },
    invalidlink: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin link anda tidak valid.'
    },
    invalidkata: {
        status: false,
        creator: `${creator}`,
        message: 'error, mungkin kata tidak ada dalam api.'
    },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'Error Hubungi nomor ini wa.me/19294427777'      
    }
}


/*
Akhir Pesan Error
*/
router.use(favicon(__path + "/views/favicon.ico"));
//>>>>>>>>>>>>(Cek Apikey)<<<<<<<<<<<<\\
router.get('/checkkey', async (req, res) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    const limit = await checkLimit(apikey);
    resapikey = await getres(apikey)
    res.send({status: true, code: 200, creator: `${creator}`, result: resapikey});
});

//===========[Random Anime]=======\\
router.get('/anime/keneki', async (req, res, next) => {
         const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const keneki = JSON.parse(fs.readFileSync(__path +'/data/keneki.json'));
  const randkeneki = keneki[Math.floor(Math.random() * keneki.length)];
  data = await fetch(randkeneki).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')
})

router.get('/anime/yotsuba', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});

  const yotsuba = JSON.parse(fs.readFileSync(__path +'/data/yotsuba.json'));
  const randyotsuba = yotsuba[Math.floor(Math.random() * yotsuba.length)];
  data = await fetch(randyotsuba).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/shinomiya', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const shinomiya = JSON.parse(fs.readFileSync(__path +'/data/shinomiya.json'));
  const randshinomiya = shinomiya[Math.floor(Math.random() * shinomiya.length)];
  data = await fetch(randshinomiya).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')
})

router.get('/anime/yumeko', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const yumeko = JSON.parse(fs.readFileSync(__path +'/data/yumeko.json'));
  const randyumeko = yumeko[Math.floor(Math.random() * yumeko.length)];
  data = await fetch(randyumeko).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')
})

router.get('/anime/tejina', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const tejina = JSON.parse(fs.readFileSync(__path +'/data/tejina.json'));
  const randtejina = tejina[Math.floor(Math.random() * tejina.length)];
  data = await fetch(randtejina).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')
})

router.get('/anime/chiho', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const chiho = JSON.parse(fs.readFileSync(__path +'/data/chiho.json'));
  const randchiho = chiho[Math.floor(Math.random() * chiho.length)];
  data = await fetch(randchiho).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')
})



router.get('/anime/yuli', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const yuli = JSON.parse(fs.readFileSync(__path +'/data/yulibocil.json'));
  const randyuli = yuli[Math.floor(Math.random() * yuli.length)];
  data = await fetch(randyuli).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/toukachan', async (req, res, next) => {
         const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const toukachan = JSON.parse(fs.readFileSync(__path +'/data/toukachan.json'));
  const randtoukachan = toukachan[Math.floor(Math.random() * toukachan.length)];
  data = await fetch(randtoukachan).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/akira', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const akira = JSON.parse(fs.readFileSync(__path +'/data/akira.json'));
  const randakira = akira[Math.floor(Math.random() * akira.length)];
  data = await fetch(randakira).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')
})

router.get('/anime/itori', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const itori = JSON.parse(fs.readFileSync(__path +'/data/itori.json'));
  const randitori = itori[Math.floor(Math.random() * itori.length)];
  data = await fetch(randitori).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/kurumi', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const kurumi = JSON.parse(fs.readFileSync(__path +'/data/kurumi.json'));
  const randkurumi = kurumi[Math.floor(Math.random() * kurumi.length)];
  data = await fetch(randkurumi).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/miku', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const miku = JSON.parse(fs.readFileSync(__path +'/data/miku.json'));
  const randmiku = miku[Math.floor(Math.random() * miku.length)];
  data = await fetch(randmiku).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/pokemon', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const pokemon = JSON.parse(fs.readFileSync(__path +'/data/pokemon.json'));
  const randpokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
  data = await fetch(randpokemon).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/doraemon', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  gay = JSON.parse(fs.readFileSync(__path +'/data/doraemon.json'));
  const randgay = gay[Math.floor(Math.random() * gay.length)]
  data = await fetch(randgay).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/kaori', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const kaori = JSON.parse(fs.readFileSync(__path +'/data/kaori.json'));
  const randkaori = kaori[Math.floor(Math.random() * kaori.length)];
  data = await fetch(randkaori).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/shizuka', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const shizuka = JSON.parse(fs.readFileSync(__path +'/data/shizuka.json'));
  const randshizuka = shizuka[Math.floor(Math.random() * shizuka.length)];
  data = await fetch(randshizuka).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/kaga', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const kaga = JSON.parse(fs.readFileSync(__path +'/data/kaga.json'));
  const randkaga = kaga[Math.floor(Math.random() * kaga.length)];
  data = await fetch(randkaga).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/kotori', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const kotori = JSON.parse(fs.readFileSync(__path +'/data/kotori.json'));
  const randkotori = kotori[Math.floor(Math.random() * kotori.length)];
  data = await fetch(randkotori).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/mikasa', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const mikasa = JSON.parse(fs.readFileSync(__path +'/data/mikasa.json'));
  const randmikasa = mikasa[Math.floor(Math.random() * mikasa.length)];
  data = await fetch(randmikasa).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/akiyama', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const akiyama = JSON.parse(fs.readFileSync(__path +'/data/akiyama.json'));
  const randakiyama = akiyama[Math.floor(Math.random() * akiyama.length)];
  data = await fetch(randakiyama).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/gremory', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const gremory = JSON.parse(fs.readFileSync(__path +'/data/gremory.json'));
  const randgremory = gremory[Math.floor(Math.random() * gremory.length)];
  data = await fetch(randgremory).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/isuzu', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const isuzu = JSON.parse(fs.readFileSync(__path +'/data/isuzu.json'));
  const randisuzu = isuzu[Math.floor(Math.random() * isuzu.length)];
  data = await fetch(randisuzu).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})


router.get('/anime/shina', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const shina = JSON.parse(fs.readFileSync(__path +'/data/shina.json'));
  const randshina = shina[Math.floor(Math.random() * shina.length)];
  data = await fetch(randshina).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/kagura', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const kagura = JSON.parse(fs.readFileSync(__path +'/data/kagura.json'));
  const randkagura = kagura[Math.floor(Math.random() * kagura.length)];
  data = await fetch(randkagura).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/shinka', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const shinka = JSON.parse(fs.readFileSync(__path +'/data/shinka.json'));
  const randshinka = shinka[Math.floor(Math.random() * shinka.length)];
  data = await fetch(randshinka).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/eba', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const eba = JSON.parse(fs.readFileSync(__path +'/data/eba.json'));
  const randeba = eba[Math.floor(Math.random() * eba.length)];
  data = await fetch(randeba).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/deidara', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Deidara = JSON.parse(fs.readFileSync(__path +'/data/deidara.json'));
  const randDeidara = Deidara[Math.floor(Math.random() * Deidara.length)];
  data = await fetch(randDeidara).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})



router.get('/anime/itachi', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Itachi = JSON.parse(fs.readFileSync(__path +'/data/itachi.json'));
  const randItachi = Itachi[Math.floor(Math.random() * Itachi.length)];
  data = await fetch(randItachi).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/madara', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Madara = JSON.parse(fs.readFileSync(__path +'/data/madara.json'));
  const randMadara = Madara[Math.floor(Math.random() * Madara.length)];
  data = await fetch(randMadara).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/yuki', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Yuki = JSON.parse(fs.readFileSync(__path +'/data/yuki.json'));
  const randYuki = Yuki[Math.floor(Math.random() * Yuki.length)];
  data = await fetch(randYuki).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/asuna', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const asuna = JSON.parse(fs.readFileSync(__path +'/data/asuna.json'));
  const randasuna = asuna[Math.floor(Math.random() * asuna.length)];
  data = await fetch(randasuna).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/ayuzawa', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const ayuzawa = JSON.parse(fs.readFileSync(__path +'/data/ayuzawa.json'));
  const randayuzawa = ayuzawa[Math.floor(Math.random() * ayuzawa.length)];
  data = await fetch(randayuzawa).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/chitoge', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const chitoge = JSON.parse(fs.readFileSync(__path +'/data/chitoge.json'));
  const randchitoge = chitoge[Math.floor(Math.random() * chitoge.length)];
  data = await fetch(randchitoge).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/emilia', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const emilia = JSON.parse(fs.readFileSync(__path +'/data/emilia.json'));
  const randemilia = emilia[Math.floor(Math.random() * emilia.length)];
  data = await fetch(randemilia).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/hestia', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const hestia = JSON.parse(fs.readFileSync(__path +'/data/hestia.json'));
  const randhestia = hestia[Math.floor(Math.random() * hestia.length)];
  data = await fetch(randhestia).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/umaru', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const umaru = JSON.parse(fs.readFileSync(__path +'/data/umaru.json'));
  const randumaru = umaru[Math.floor(Math.random() * umaru.length)];
  data = await fetch(randumaru).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/inori', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const inori = JSON.parse(fs.readFileSync(__path +'/data/inori.json'));
  const randinori = inori[Math.floor(Math.random() * inori.length)];
  data = await fetch(randinori).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/ana', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const ana = JSON.parse(fs.readFileSync(__path +'/data/ana.json'));
  const randana = ana[Math.floor(Math.random() * ana.length)];
  data = await fetch(randana).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/ana.jpeg', data)
  res.sendFile(__path +'/tmp/ana.jpeg')

})

router.get('/anime/boruto', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Boruto = JSON.parse(fs.readFileSync(__path +'/data/boruto.json'));
  const randBoruto = Boruto[Math.floor(Math.random() * Boruto.length)];
  data = await fetch(randBoruto).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/erza', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Erza = JSON.parse(fs.readFileSync(__path +'/data/erza.json'));
  const randErza = Erza[Math.floor(Math.random() * Erza.length)];
  data = await fetch(randErza).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/kakasih', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Kakasih = JSON.parse(fs.readFileSync(__path +'/data/kakasih.json'));
  const randKakasih = Kakasih[Math.floor(Math.random() * Kakasih.length)];
  data = await fetch(randKakasih).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/sagiri', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Sagiri = JSON.parse(fs.readFileSync(__path +'/data/sagiri.json'));
  const randSagiri = Sagiri[Math.floor(Math.random() * Sagiri.length)];
  data = await fetch(randSagiri).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/minato', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Minato = JSON.parse(fs.readFileSync(__path +'/data/minato.json'));
  const randMinato = Minato[Math.floor(Math.random() * Minato.length)];
  data = await fetch(randMinato).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/naruto', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Naruto = JSON.parse(fs.readFileSync(__path +'/data/naruto.json'));
  const randNaruto = Naruto[Math.floor(Math.random() * Naruto.length)];
  data = await fetch(randNaruto).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/nezuko', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Nezuko = JSON.parse(fs.readFileSync(__path +'/data/nezuko.json'));
  const randNezuko = Nezuko[Math.floor(Math.random() * Nezuko.length)];
  data = await fetch(randNezuko).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/onepiece', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Pic = JSON.parse(fs.readFileSync(__path +'/data/onepiece.json'));
  const randPic = Pic[Math.floor(Math.random() * Pic.length)];
  data = await fetch(randPic).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/rize', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Rize = JSON.parse(fs.readFileSync(__path +'/data/rize.json'));
  const randRize = Rize[Math.floor(Math.random() * Rize.length)];
  data = await fetch(randRize).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/sakura', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Sakura = JSON.parse(fs.readFileSync(__path +'/data/sakura.json'));
  const randSakura = Sakura[Math.floor(Math.random() * Sakura.length)];
  data = await fetch(randSakura).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/sasuke', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Sasuke = JSON.parse(fs.readFileSync(__path +'/data/sasuke.json'));
  const randSasuke = Sasuke[Math.floor(Math.random() * Sasuke.length)];
  data = await fetch(randSasuke).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/tsunade', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Su = JSON.parse(fs.readFileSync(__path +'/data/tsunade.json'));
  const randSu = Su[Math.floor(Math.random() * Su.length)];
  data = await fetch(randSu).then(v => v.buffer())
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path +'/tmp/sagiri.jpeg')

})


router.get('/anime/waifu2', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Wai2 = JSON.parse(fs.readFileSync(__path +'/data/waifu2.json'));
  const randWai2 = Wai2[Math.floor(Math.random() * Wai2.length)];
  data = await fetch(randWai2).then(v => v.buffer());
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path+ '/tmp/sagiri.jpeg');

})

router.get('/anime/waifu', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});

    limitAdd(apikey);
    fetch(encodeURI(`https://waifu.pics/api/sfw/waifu`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())

  })
})


router.get('/anime/elaina', async (req, res, next) => {
       const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


const Elaina = JSON.parse(fs.readFileSync(__path +'/data/elaina.json'))
const randElaina = Elaina[Math.floor(Math.random() * Elaina.length)]
//tansole.log(randLoli)
data = await fetch(randElaina).then(v => v.buffer())
await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
limitAdd(apikey)
res.sendFile(__path +'/tmp/sagiri.jpeg')

})


router.get('/anime/loli', async (req, res, next) => {
        const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q= " + "Loli",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }
    request(options, function(error, response, responseBody) {
        if (error) return

        $ = cheerio.load(responseBody)
        var links = $(".image a.link")
        var cari = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"))
        if (!cari.length) return
        var hasil = cari[Math.floor(Math.random() * cari.length)]
        res.json({
            status: true,
            code: 200,
            creator: `${creator}`,
            result: hasil
        })
    })
})


router.get('/anime/yuri', async (req, res, next) => {
       const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


const Yuri = JSON.parse(fs.readFileSync(__path +'/data/yuri.json'))
const randYuri = Yuri[Math.floor(Math.random() * Yuri.length)]
//tansole.log(randTech)
data = await fetch(randYuri).then(v => v.buffer())
await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
limitAdd(apikey)
res.sendFile(__path +'/tmp/sagiri.jpeg')

})

router.get('/anime/shota', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Shota = JSON.parse(fs.readFileSync(__path +'/data/shota.json'));
  const randShota = Shota[Math.floor(Math.random() * Shota.length)];
  data = await fetch(randShota).then(v => v.buffer());
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path+ '/tmp/sagiri.jpeg');

})

router.get('/anime/neko', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});

    fetch(encodeURI(`https://waifu.pics/api/sfw/neko`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
  limitAdd(apikey)
  })
})

router.get('/anime/hinata', async (req, res, next) => {
          const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});


  const Hinata = JSON.parse(fs.readFileSync(__path +'/data/hinata.json'));
  const randHin = Hinata[Math.floor(Math.random() * Hinata.length)];
  data = await fetch(randHin).then(v => v.buffer());
  await fs.writeFileSync(__path +'/tmp/sagiri.jpeg', data)
  limitAdd(apikey)
  res.sendFile(__path+ '/tmp/sagiri.jpeg');

})

router.get('/anime/shinobu', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://waifu.pics/api/sfw/shinobu`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
        })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/anime/megumin', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://waifu.pics/api/sfw/megumin`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
        })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/anime/cosplay', async (req, res, next) => {
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});

    fetch(encodeURI(`https://raw.githubusercontent.com/Johannes2803/database/main/cosplay.json`))
    .then(response => response.json())
    .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var requestSettings = {
            url: result,
            method: 'GET',
            encoding: null
        };
        request(requestSettings, function (error, response, body) {
            res.set('Content-Type', 'image/png');
            res.send(body);
        });
    })
limitAdd(apikey);
})

router.get('/anime/marin-kitagawa', async (req, res, next) => {
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});

    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=marin-kitagawa`))
    .then(response => response.json())
    .then(data => {
        
        var result = data.images[0].url;
        var requestSettings = {
            url: result,
            method: 'GET',
            encoding: null
        };
        request(requestSettings, function (error, response, body) {
            res.set('Content-Type', 'image/png');
            res.send(body);
        });
    })
limitAdd(apikey);
})
    

//========================> DOWNLOADER <========================//

router.get('/download/playmp3', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    const query = req.query.query;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!query) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid query"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    const result = await  ytPlayMp3(query)
    res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
        })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/download/playmp4', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    const query = req.query.query;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!query) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid query"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    const result = await  ytPlayMp4(query)
    res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
        })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/download/ytmp4', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    const result = await  ytDonlodMp4(url)
    res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
        })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/download/ytmp3', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    const result = await ytDonlodMp3(url)
    res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
        })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/download/facebook', async (req, res, next) => {
 try{
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let ttlu = await frieren.facebook.v1(url)
    var result = ttlu;
    res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
    })
    limitAdd(apikey);
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
        }
    });

router.get('/download/instagram', async (req, res, next) => {
  try {
    const apikey = req.query.apikey;
    const url = req.query.url;

    if (!apikey) {
      return res.status(404).send({
        status: 404,
        message: 'Parameter apikey diperlukan'
      });
    }

    if (!url) {
      return res.json({
        status: false,
        creator: `${creator}`,
        message: 'URL tidak valid'
      });
    }

    const check = await cekKey(apikey);
    if (!check) {
      return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} tidak ditemukan, silakan daftar terlebih dahulu!`
      });
    }

    const limit = await isLimit(apikey);
    if (limit) {
      return res.status(403).send({
        status: 403,
        message: 'Batas permintaan terlampaui (100 permintaan / hari), hubungi pemilik untuk peningkatan ke premium'
      });
    }

    // Membuat permintaan API eksternal
    const externalApiResponse = await axios.get('https://api.lolhuman.xyz/api/instagram', {
      params: {
        apikey: 'ajiart01', // API key eksternal untuk layanan eksternal
        url
      }
    });

    const result = externalApiResponse.data;

    res.json({
      status: true,
      code: 200,
      creator: `${creator}`,
      result
    });

    limitAdd(apikey);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: 500,
      message: 'Terjadi kesalahan internal. Silakan laporkan melalui WhatsApp',
      result: 'error'
    });
  }
});



/* router.get('/download/igstory', async (req, res, next) => {
  try{
    let username = req.query.username
    let apikey = req.query.apikey
     if (!username) return res.status(400).send({ status: 400, message: 'username tidak boleh kosong!', result: 'error' })
     if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
   
     limitAdd(apikey);
     let result = await ch.igStory(username)
     res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });*/

router.get('/download/mediafire', async (req, res, next) => {
 try{
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.mediafireDl(url)
              res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
    limitAdd(apikey);   
 } catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
  }
});

router.get('/download/tiktok', async (req, res, next) => {
 try{
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let ttlu = await frieren.tiktok.v1(url)
    var result = ttlu;
    res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
    })
    limitAdd(apikey);
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
        }
    });

    router.get('/download/pindl',async (req, res, next) => {
 try{
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let ttlu = await frieren.pinterest.v1(url)
    var result = ttlu;
    res.json({
        status: true,
        code: 200,
        creator: `${creator}`,
        result
    })
    limitAdd(apikey);
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
        }
    });

router.get('/download/twitter', async (req, res, next) => {
try {
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await scr.twitterdl(url)
    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
    limitAdd(apikey);
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/download/soundcloud', async (req, res, next) => {
try {
    var apikey = req.query.apikey
    var url = req.query.url
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "invalid url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.scdl(url)
    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
    limitAdd(apikey);
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
  }
});

router.get('/download/pixiv', async (req, res, next) => {
    try {     
            let id = req.query.id
            let ext = req.query.ext
            let apikey = req.query.apikey
            if (!id) return res.status(403).send({ status: 403, message: 'id tidak boleh kosong!', result: 'error' })
            if (!ext) return res.status(403).send({ status: 403, message: 'ext tidak boleh kosong!', result: 'error' })
            if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
            const check = await cekKey(apikey);
            if (!check) return res.status(403).send({
                status: 403,
                message: `apikey ${apikey} not found, please register first!`
            });
            let limit = await isLimit(apikey);
            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
            limitAdd(apikey);
            let hasil = await ch.pixivDl(id, ext)
            let data = await fetch(hasil).then(v => v.buffer());
            await fs.writeFileSync(__path +'/tmp/image.jpg', data)
            await res.sendFile(__path +'/tmp/image.jpg')
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
        }
    });
 
  router.get('/download/sfiledl', async (req, res, next) => {
     try {
            let url = req.query.url
            let apikey = req.query.apikey
            if (apikey === undefined) return res.status(404).send({
                status: 404,
                message: `Input Parameter apikey`
            });
            if (!url) return res.json({
                status: false,
                creator: `${creator}`,
                message: "invalid url"
            })
            const check = await cekKey(apikey);
            if (!check) return res.status(403).send({
                status: 403,
                message: `apikey ${apikey} not found, please register first!`
            });
            let limit = await isLimit(apikey);
            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
            limitAdd(apikey);
            let result = await ch.sfiledl(url)
              res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
            } catch (err) {
                console.log(err);
                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
            }
        });

        router.get('/download/aiovideodl', async (req, res, next) => {
            try {
                   let url = req.query.url
                   let apikey = req.query.apikey
                   if (apikey === undefined) return res.status(404).send({
                       status: 404,
                       message: `Input Parameter apikey`
                   });
                   if (!url) return res.json({
                       status: false,
                       creator: `${creator}`,
                       message: "invalid url"
                   })
                   const check = await cekKey(apikey);
                   if (!check) return res.status(403).send({
                       status: 403,
                       message: `apikey ${apikey} not found, please register first!`
                   });
                   let limit = await isLimit(apikey);
                   if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                   limitAdd(apikey);
                  let result = await scr.aiovideodl(url)
                   res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                   } catch (err) {
                       console.log(err);
                       res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                   }
               });
            
               router.get('/download/xnxxdl', async (req, res, next) => {
                try {
                       let url = req.query.url
                       let apikey = req.query.apikey
                       if (apikey === undefined) return res.status(404).send({
                           status: 404,
                           message: `Input Parameter apikey`
                       });
                       if (!url) return res.json({
                           status: false,
                           creator: `${creator}`,
                           message: "invalid url"
                       })
                       const check = await cekKey(apikey);
                       if (!check) return res.status(403).send({
                           status: 403,
                           message: `apikey ${apikey} not found, please register first!`
                       });
                       let limit = await isLimit(apikey);
                       if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                       limitAdd(apikey);
                       let result = await ch.xnxxDl(url)
                       // let urlnya = await shorts(result.files.high)
                       res.json({
                            result
                        })
                       } catch (err) {
                           console.log(err);
                           res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                       }
                   });

                  /* router.get('/download/joox', async (req, res, next) => {
                    var apikey = req.query.apikey
                    var q = req.query.q
                       if (apikey === undefined) return res.status(404).send({
                           status: 404,
                           message: `Input Parameter apikey`
                       });
                       if (!q) return res.json({
                           status: false,
                           creator: `${creator}`,
                           message: "invalid url"
                       })
                       const check = await cekKey(apikey);
                       if (!check) return res.status(403).send({
                           status: 403,
                           message: `apikey ${apikey} not found, please register first!`
                       });
                       let limit = await isLimit(apikey);
                       if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                    const result = await joox.joox(q)
                    res.json({
                            result
                        })
                        .catch(e => {
                            console.log(err);
                           res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                        })
                    limitAdd(apikey);
                })*/

                router.get('/download/stickerDl', async (req, res, next) => {
                    try {
                        let url = req.query.url
                        let apikey = req.query.apikey
                        if (apikey === undefined) return res.status(404).send({
                            status: 404,
                            message: `Input Parameter apikey`
                        });
                        if (!url) return res.json({
                            status: false,
                            creator: `${creator}`,
                            message: "invalid url"
                        })
                        const check = await cekKey(apikey);
                        if (!check) return res.status(403).send({
                            status: 403,
                            message: `apikey ${apikey} not found, please register first!`
                        });
                        let limit = await isLimit(apikey);
                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                        let result = await ch.stickerDl(url)
                         res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                        limitAdd(apikey);
                    } catch (err) {
                        console.log(err);
                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                      }
                    });

                    router.get('/download/telesticker', async (req, res, next) => {
                        try {
                            let url = req.query.url
                            let apikey = req.query.apikey
                            if (apikey === undefined) return res.status(404).send({
                                status: 404,
                                message: `Input Parameter apikey`
                            });
                            if (!url) return res.json({
                                status: false,
                                creator: `${creator}`,
                                message: "invalid url"
                            })
                            const check = await cekKey(apikey);
                            if (!check) return res.status(403).send({
                                status: 403,
                                message: `apikey ${apikey} not found, please register first!`
                            });
                            let limit = await isLimit(apikey);
                            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                            let result = await ch.telesticker(url)
                             res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                            limitAdd(apikey);
                        } catch (err) {
                            console.log(err);
                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                          }
                        });
//======================> SEARCHING AREA <===========================//

router.get('/search/pinterest', async (req, res, next) => {
    try {
        let query = req.query.query
        let apikey = req.query.apikey
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        if (!query) return res.json({
            status: false,
            creator: `${creator}`,
            message: "input pencarian kosong! isi terlebih dahulu!"
        })
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
        let result = await ch.pinterest(query)
         res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

    router.get('/search/xnxxsearch', async (req, res, next) => {
        try {
            let query = req.query.query
            let apikey = req.query.apikey
            if (apikey === undefined) return res.status(404).send({
                status: 404,
                message: `Input Parameter apikey`
            });
            if (!query) return res.json({
                status: false,
                creator: `${creator}`,
                message: "input pencarian kosong! isi terlebih dahulu!"
            })
            const check = await cekKey(apikey);
            if (!check) return res.status(403).send({
                status: 403,
                message: `apikey ${apikey} not found, please register first!`
            });
            let limit = await isLimit(apikey);
            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
            let hasil = await ch.xnxxSearch(query)
             res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: hasil })
            limitAdd(apikey);
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
          }
        });

        router.get('/search/konachan', async (req, res, next) => {
            try {
                let query = req.query.query
                let apikey = req.query.apikey
                if (apikey === undefined) return res.status(404).send({
                    status: 404,
                    message: `Input Parameter apikey`
                });
                if (!query) return res.json({
                    status: false,
                    creator: `${creator}`,
                    message: "input pencarian kosong! isi terlebih dahulu!"
                })
                const check = await cekKey(apikey);
                if (!check) return res.status(403).send({
                    status: 403,
                    message: `apikey ${apikey} not found, please register first!`
                });
                let limit = await isLimit(apikey);
                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                let img = await ch.konachan(query)
                let result = img[Math.floor(Math.random() * (img.length))]
                let data = await fetch(result).then(v => v.buffer());
                await fs.writeFileSync(__path +'/tmp/konachan.png', data)
                await res.sendFile(__path +'/tmp/konachan.png')
                limitAdd(apikey);
            } catch (err) {
                console.log(err);
                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
              }
            });

            router.get('/search/sticker', async (req, res, next) => {
                try {
                    let query = req.query.query
                    let apikey = req.query.apikey
                    if (apikey === undefined) return res.status(404).send({
                        status: 404,
                        message: `Input Parameter apikey`
                    });
                    if (!query) return res.json({
                        status: false,
                        creator: `${creator}`,
                        message: "input pencarian kosong! isi terlebih dahulu!"
                    })
                    const check = await cekKey(apikey);
                    if (!check) return res.status(403).send({
                        status: 403,
                        message: `apikey ${apikey} not found, please register first!`
                    });
                    let limit = await isLimit(apikey);
                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                    let result = await ch.stickerSearch(query)
                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                    limitAdd(apikey);
                } catch (err) {
                    console.log(err);
                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                  }
                });

                /* router.get('/search/pixivsearch', async (req, res, next) => {
                    try {
                        let query = req.query.query
                        let apikey = req.query.apikey
                        if (apikey === undefined) return res.status(404).send({
                            status: 404,
                            message: `Input Parameter apikey`
                        });
                        if (!query) return res.json({
                            status: false,
                            creator: `${creator}`,
                            message: "input pencarian kosong! isi terlebih dahulu!"
                        })
                        const check = await cekKey(apikey);
                        if (!check) return res.status(403).send({
                            status: 403,
                            message: `apikey ${apikey} not found, please register first!`
                        });
                        let limit = await isLimit(apikey);
                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                        let result = await ch.searchIlust(query)
                        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                        limitAdd(apikey);
                    } catch (err) {
                        console.log(err);
                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                      }
                    });*/

                    router.get('/search/happymod', async (req, res, next) => {
                        try {
                            let query = req.query.query
                            let apikey = req.query.apikey
                            if (apikey === undefined) return res.status(404).send({
                                status: 404,
                                message: `Input Parameter apikey`
                            });
                            if (!query) return res.json({
                                status: false,
                                creator: `${creator}`,
                                message: "input pencarian kosong! isi terlebih dahulu!"
                            })
                            const check = await cekKey(apikey);
                            if (!check) return res.status(403).send({
                                status: 403,
                                message: `apikey ${apikey} not found, please register first!`
                            });
                            let limit = await isLimit(apikey);
                            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                            let result = await ch.happymodSearch(query)
                            res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                            limitAdd(apikey);
                        } catch (err) {
                            console.log(err);
                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                          }
                        });

                        router.get('/search/sfilesearch', async (req, res, next) => {
                            try {
                                let query = req.query.query
                                let page = req.query.page
                                let apikey = req.query.apikey
                                if (apikey === undefined) return res.status(404).send({
                                    status: 404,
                                    message: `Input Parameter apikey`
                                });
                                if (!page) return res.status(400).send({ 
                                    status: 400,
                                    message: 'page tidak boleh kosong!', 
                                    result: 'error' })
                                if (!query) return res.json({
                                    status: false,
                                    creator: `${creator}`,
                                    message: "input pencarian kosong! isi terlebih dahulu!"
                                })
                                const check = await cekKey(apikey);
                                if (!check) return res.status(403).send({
                                    status: 403,
                                    message: `apikey ${apikey} not found, please register first!`
                                });
                                let limit = await isLimit(apikey);
                                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                let result = await ch.sfilesearch(query, page)
                                res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                limitAdd(apikey);
                            } catch (err) {
                                console.log(err);
                                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                              }
                            });

                            router.get('/search/domainsearch', async (req, res, next) => {
                                try {
                                    let query = req.query.query
                                    let apikey = req.query.apikey
                                    if (apikey === undefined) return res.status(404).send({
                                        status: 404,
                                        message: `Input Parameter apikey`
                                    });
                                    if (!query) return res.json({
                                        status: false,
                                        creator: `${creator}`,
                                        message: "input pencarian kosong! isi terlebih dahulu!"
                                    })
                                    const check = await cekKey(apikey);
                                    if (!check) return res.status(403).send({
                                        status: 403,
                                        message: `apikey ${apikey} not found, please register first!`
                                    });
                                    let limit = await isLimit(apikey);
                                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                    let result = await ch.domainSearch(query)
                                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                    limitAdd(apikey);
                                } catch (err) {
                                    console.log(err);
                                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                  }
                                });

                                router.get('/search/cekdomain', async (req, res, next) => {
                                    try {
                                        let domain = req.query.domain
                                        let apikey = req.query.apikey
                                        if (apikey === undefined) return res.status(404).send({
                                            status: 404,
                                            message: `Input Parameter apikey`
                                        });
                                        if (!domain) return res.json({
                                            status: false,
                                            creator: `${creator}`,
                                            message: "domain tidak boleh kosong!"
                                        })
                                        const check = await cekKey(apikey);
                                        if (!check) return res.status(403).send({
                                            status: 403,
                                            message: `apikey ${apikey} not found, please register first!`
                                        });
                                        let limit = await isLimit(apikey);
                                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                        let result = await ch.whois(domain)
                                        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                        limitAdd(apikey);
                                    } catch (err) {
                                        console.log(err);
                                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                      }
                                    });

                                        router.get('/search/stickerline', async (req, res, next) => {
                                            try {
                                                let query = req.query.query
                                                let apikey = req.query.apikey
                                                if (apikey === undefined) return res.status(404).send({
                                                    status: 404,
                                                    message: `Input Parameter apikey`
                                                });
                                                if (!query) return res.json({
                                                    status: false,
                                                    creator: `${creator}`,
                                                    message: "input pencarian kosong! isi terlebih dahulu!"
                                                })
                                                const check = await cekKey(apikey);
                                                if (!check) return res.status(403).send({
                                                    status: 403,
                                                    message: `apikey ${apikey} not found, please register first!`
                                                });
                                                let limit = await isLimit(apikey);
                                                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                let result = await scr.stickerLine(query)
                                                res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                limitAdd(apikey);
                                            } catch (err) {
                                                console.log(err);
                                                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                              }
                                            });

                                            router.get('/search/google', async (req, res, next) => {
                                                try {
                                                    let query = req.query.query
                                                    let apikey = req.query.apikey
                                                    if (apikey === undefined) return res.status(404).send({
                                                        status: 404,
                                                        message: `Input Parameter apikey`
                                                    });
                                                    if (!query) return res.json({
                                                        status: false,
                                                        creator: `${creator}`,
                                                        message: "input pencarian kosong! isi terlebih dahulu!"
                                                    })
                                                    const check = await cekKey(apikey);
                                                    if (!check) return res.status(403).send({
                                                        status: 403,
                                                        message: `apikey ${apikey} not found, please register first!`
                                                    });
                                                    let limit = await isLimit(apikey);
                                                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                    let result = await scr.googleIt(query)
                                                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                    limitAdd(apikey);
                                                } catch (err) {
                                                    console.log(err);
                                                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                  }
                                                });

                                                router.get('/search/gimage', async (req, res, next) => {
                                                    try {
                                                        let query = req.query.query
                                                        let apikey = req.query.apikey
                                                        if (apikey === undefined) return res.status(404).send({
                                                            status: 404,
                                                            message: `Input Parameter apikey`
                                                        });
                                                        if (!query) return res.json({
                                                            status: false,
                                                            creator: `${creator}`,
                                                            message: "input pencarian kosong! isi terlebih dahulu!"
                                                        })
                                                        const check = await cekKey(apikey);
                                                        if (!check) return res.status(403).send({
                                                            status: 403,
                                                            message: `apikey ${apikey} not found, please register first!`
                                                        });
                                                        let limit = await isLimit(apikey);
                                                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                        let result = await scr.googleImage(query)
                                                        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                        limitAdd(apikey);
                                                    } catch (err) {
                                                        console.log(err);
                                                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                      }
                                                    });

                                                    router.get('/search/ytsearch', async (req, res, next) => {
                                                        try {
                                                            let query = req.query.query
                                                            let apikey = req.query.apikey
                                                            if (apikey === undefined) return res.status(404).send({
                                                                status: 404,
                                                                message: `Input Parameter apikey`
                                                            });
                                                            if (!query) return res.json({
                                                                status: false,
                                                                creator: `${creator}`,
                                                                message: "input pencarian kosong! isi terlebih dahulu!"
                                                            })
                                                            const check = await cekKey(apikey);
                                                            if (!check) return res.status(403).send({
                                                                status: 403,
                                                                message: `apikey ${apikey} not found, please register first!`
                                                            });
                                                            let limit = await isLimit(apikey);
                                                            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                            let result = await scr.youtubeSearch(query)
                                                            res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                            limitAdd(apikey);
                                                        } catch (err) {
                                                            console.log(err);
                                                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                          }
                                                        });

                                                        router.get('/search/wallpaper', async (req, res, next) => {
                                                            try {
                                                                let query = req.query.query
                                                                let apikey = req.query.apikey
                                                                if (apikey === undefined) return res.status(404).send({
                                                                    status: 404,
                                                                    message: `Input Parameter apikey`
                                                                });
                                                                if (!query) return res.json({
                                                                    status: false,
                                                                    creator: `${creator}`,
                                                                    message: "input pencarian kosong! isi terlebih dahulu!"
                                                                })
                                                                const check = await cekKey(apikey);
                                                                if (!check) return res.status(403).send({
                                                                    status: 403,
                                                                    message: `apikey ${apikey} not found, please register first!`
                                                                });
                                                                let limit = await isLimit(apikey);
                                                                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                                let result = await scr.wallpaper(query)
                                                                res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                                limitAdd(apikey);
                                                            } catch (err) {
                                                                console.log(err);
                                                                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                              }
                                                            });

                                                            router.get('/search/lirik', async (req, res, next) => {
                                                                try {
                                                                    let query = req.query.query
                                                                    let apikey = req.query.apikey
                                                                    if (apikey === undefined) return res.status(404).send({
                                                                        status: 404,
                                                                        message: `Input Parameter apikey`
                                                                    });
                                                                    if (!query) return res.json({
                                                                        status: false,
                                                                        creator: `${creator}`,
                                                                        message: "input pencarian kosong! isi terlebih dahulu!"
                                                                    })
                                                                    const check = await cekKey(apikey);
                                                                    if (!check) return res.status(403).send({
                                                                        status: 403,
                                                                        message: `apikey ${apikey} not found, please register first!`
                                                                    });
                                                                    let limit = await isLimit(apikey);
                                                                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                                    let result = await scr.lyrics(query)
                                                                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                                    limitAdd(apikey);
                                                                } catch (err) {
                                                                    console.log(err);
                                                                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                                  }
                                                                });

                                                                router.get('/search/danbooru', async (req, res, next) => {
                                                                    try {
                                                                        let query = req.query.query
                                                                        let apikey = req.query.apikey
                                                                        if (apikey === undefined) return res.status(404).send({
                                                                            status: 404,
                                                                            message: `Input Parameter apikey`
                                                                        });
                                                                        if (!query) return res.json({
                                                                            status: false,
                                                                            creator: `${creator}`,
                                                                            message: "input pencarian kosong! isi terlebih dahulu!"
                                                                        })
                                                                        const check = await cekKey(apikey);
                                                                        if (!check) return res.status(403).send({
                                                                            status: 403,
                                                                            message: `apikey ${apikey} not found, please register first!`
                                                                        });
                                                                        let limit = await isLimit(apikey);
                                                                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                                        await frieren.danbooru.search(query)
                                                                        .then(data => {          
                                                                            var result = data;
                                                                            res.json({            
                                                                            status: true, 
                                                                            code: 200, 
                                                                            creator: `${creator}`,
                                                                            result
                                                                        })
                                                                        })
                                                                        limitAdd(apikey);
                                                                    } catch (err) {
                                                                        console.log(err);
                                                                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                                      }
                                                                    });
//================================ ANIMANGA =================================//


router.get('/animanga/nhentai', async (req, res, next) => {
    try {
        let code = req.query.code
        let apikey = req.query.apikey
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
        });
        if (!code) return res.json({
            status: false,
            creator: `${creator}`,
            message: "code tidak boleh kosong!"
        })
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
        let result = await ch.nhentai(code)
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

    router.get('/animanga/nhentaipdf', async (req, res, next) => {
        try {
            let code = req.query.code
            let apikey = req.query.apikey
            if (apikey === undefined) return res.status(404).send({
                status: 404,
                message: `Input Parameter apikey`
            });
            if (!code) return res.json({
                status: false,
                creator: `${creator}`,
                message: "code tidak boleh kosong!"
            })
            const check = await cekKey(apikey);
            if (!check) return res.status(403).send({
                status: 403,
                message: `apikey ${apikey} not found, please register first!`
            });
            let limit = await isLimit(apikey);
            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
            await ch.nhentaiv2(code)
        .then(async data => {           
            var buffer = await toPDF(data.list_image), filename = `${data.id}.pdf`
            fs.writeFileSync(path.join(os.tmpdir(), filename), buffer)
            res.json({            
            status: true,
            code: 200, 
            creator: `${creator}`,
            result: `https://${req.get('host')}/download/${filename}`
        })
        })
            limitAdd(apikey);
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
          }
        });

        router.get('/animanga/nhsearch', async (req, res, next) => {
            try {
                let query = req.query.query
                let apikey = req.query.apikey
                if (apikey === undefined) return res.status(404).send({
                    status: 404,
                    message: `Input Parameter apikey`
                });
                if (!query) return res.json({
                    status: false,
                    creator: `${creator}`,
                    message: "input pencarian kosong! isi terlebih dahulu!"
                })
                const check = await cekKey(apikey);
                if (!check) return res.status(403).send({
                    status: 403,
                    message: `apikey ${apikey} not found, please register first!`
                });
                let limit = await isLimit(apikey);
                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                let result = await ch.nhentaisearch(query)
                res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                limitAdd(apikey);
            } catch (err) {
                console.log(err);
                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
              }
            });

            router.get('/animanga/doujindesu', async (req, res, next) => {
                    let url = req.query.url
                    let apikey = req.query.apikey
                    if (apikey === undefined) return res.status(404).send({
                        status: 404,
                        message: `Input Parameter apikey`
                     });
                    if (!url) return res.json({
                        status: false,
                        creator: `${creator}`,
                        message: "invalid url"
                    })
                    const check = await cekKey(apikey);
                    if (!check) return res.status(403).send({
                        status: 403,
                        message: `apikey ${apikey} not found, please register first!`
                    });
                    let limit = await isLimit(apikey);
                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                    await ch.Getdownload(url)
                   .then(async data => {  
                    res.json({            
                     status: true, 
                     code: 200, 
                     creator: `${creator}`,
                  result: { 
                      id: data.id,
                      title: data.title,
                      link_download: data.url,
                      link_pages: data.pages
                 }
             })
          })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                    })
                limitAdd(apikey);
            })

            router.get('/animanga/doudesusearch', async (req, res, next) => {
                try {
                    let query = req.query.query
                    let apikey = req.query.apikey
                    if (apikey === undefined) return res.status(404).send({
                        status: 404,
                        message: `Input Parameter apikey`
                    });
                    if (!query) return res.json({
                        status: false,
                        creator: `${creator}`,
                        message: "input pencarian kosong! isi terlebih dahulu!"
                    })
                    const check = await cekKey(apikey);
                    if (!check) return res.status(403).send({
                        status: 403,
                        message: `apikey ${apikey} not found, please register first!`
                    });
                    let limit = await isLimit(apikey);
                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                    let result = await ch.Getsearch(query)
                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                    limitAdd(apikey);
                } catch (err) {
                    console.log(err);
                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                  }
                });

                router.get('/animanga/doujinlatest', async (req, res, next) => {
                    try {
                        let apikey = req.query.apikey
                        if (apikey === undefined) return res.status(404).send({
                            status: 404,
                            message: `Input Parameter apikey`
                        });
                        const check = await cekKey(apikey);
                        if (!check) return res.status(403).send({
                            status: 403,
                            message: `apikey ${apikey} not found, please register first!`
                        });
                        let limit = await isLimit(apikey);
                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                        let result = await ch.Getlatest()
                        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                        limitAdd(apikey);
                    } catch (err) {
                        console.log(err);
                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                      }
                    });
                    
                    router.get('/animanga/doujindetail', async (req, res, next) => {
                        try {
                        let url = req.query.url
                        let apikey = req.query.apikey
                        if (apikey === undefined) return res.status(404).send({
                            status: 404,
                            message: `Input Parameter apikey`
                         });
                        if (!url) return res.json({
                            status: false,
                            creator: `${creator}`,
                            message: "invalid url"
                        })
                        const check = await cekKey(apikey);
                        if (!check) return res.status(403).send({
                            status: 403,
                            message: `apikey ${apikey} not found, please register first!`
                        });
                        let limit = await isLimit(apikey);
                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                        let result = await ch.Getdetail(url)
                            res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                            limitAdd(apikey);
                        } catch (err) {
                            console.log(err);
                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                          }
                        });

                    router.get('/animanga/kusonime', async (req, res, next) => {
                        try {
                            let query = req.query.query
                            let apikey = req.query.apikey
                            if (apikey === undefined) return res.status(404).send({
                                status: 404,
                                message: `Input Parameter apikey`
                            });
                            if (!query) return res.json({
                                status: false,
                                creator: `${creator}`,
                                message: "input pencarian kosong! isi terlebih dahulu!"
                            })
                            const check = await cekKey(apikey);
                            if (!check) return res.status(403).send({
                                status: 403,
                                message: `apikey ${apikey} not found, please register first!`
                            });
                            let limit = await isLimit(apikey);
                            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                            let result = await ch.kusoNime(query)
                            res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                            limitAdd(apikey);
                        } catch (err) {
                            console.log(err);
                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                          }
                        });

                        router.get('/animanga/animeinfo', async (req, res, next) => {
                            try {
                                let url = req.query.url
                                let apikey = req.query.apikey
                                if (apikey === undefined) return res.status(404).send({
                                    status: 404,
                                    message: `Input Parameter apikey`
                                });
                                if (!url) return res.json({
                                    status: false,
                                    creator: `${creator}`,
                                    message: "invalid url"
                                })
                                const check = await cekKey(apikey);
                                if (!check) return res.status(403).send({
                                    status: 403,
                                    message: `apikey ${apikey} not found, please register first!`
                                });
                                let limit = await isLimit(apikey);
                                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                let result = await ch.getInfoAnime(url)
                                 res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                limitAdd(apikey);
                            } catch (err) {
                                console.log(err);
                                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                              }
                            });

                            router.get('/animanga/mynimekusearch', async (req, res, next) => {
                                try {
                                    let query = req.query.query
                                    let apikey = req.query.apikey
                                    if (apikey === undefined) return res.status(404).send({
                                        status: 404,
                                        message: `Input Parameter apikey`
                                    });
                                    if (!query) return res.json({
                                        status: false,
                                        creator: `${creator}`,
                                        message: "input pencarian kosong! isi terlebih dahulu!"
                                    })
                                    const check = await cekKey(apikey);
                                    if (!check) return res.status(403).send({
                                        status: 403,
                                        message: `apikey ${apikey} not found, please register first!`
                                    });
                                    let limit = await isLimit(apikey);
                                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                    let result = await ch.mynimeSearch(query)
                                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                    limitAdd(apikey);
                                } catch (err) {
                                    console.log(err);
                                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                  }
                                });

                                router.get('/animanga/komiklatest', async (req, res, next) => {
                                    try {
                                        let apikey = req.query.apikey
                                        if (apikey === undefined) return res.status(404).send({
                                            status: 404,
                                            message: `Input Parameter apikey`
                                        });
                                        const check = await cekKey(apikey);
                                        if (!check) return res.status(403).send({
                                            status: 403,
                                            message: `apikey ${apikey} not found, please register first!`
                                        });
                                        let limit = await isLimit(apikey);
                                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                        let result = await ch.getLatestKomik()
                                        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                        limitAdd(apikey);
                                    } catch (err) {
                                        console.log(err);
                                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                      }
                                    });

                                    router.get('/animanga/komikdl', async (req, res, next) => {
                                        try {
                                            let url = req.query.url
                                            let apikey = req.query.apikey
                                            if (apikey === undefined) return res.status(404).send({
                                                status: 404,
                                                message: `Input Parameter apikey`
                                            });
                                            if (!url) return res.json({
                                                status: false,
                                                creator: `${creator}`,
                                                message: "invalid url"
                                            })
                                            const check = await cekKey(apikey);
                                            if (!check) return res.status(403).send({
                                                status: 403,
                                                message: `apikey ${apikey} not found, please register first!`
                                            });
                                            let limit = await isLimit(apikey);
                                            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                            let result = await ch.KomikDl(url)
                                             res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                            limitAdd(apikey);
                                        } catch (err) {
                                            console.log(err);
                                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                          }
                                        });

                                        router.get('/animanga/hanimelatest', async (req, res, next) => {
                                            try {
                                                let apikey = req.query.apikey
                                                if (apikey === undefined) return res.status(404).send({
                                                    status: 404,
                                                    message: `Input Parameter apikey`
                                                });
                                                const check = await cekKey(apikey);
                                                if (!check) return res.status(403).send({
                                                    status: 403,
                                                    message: `apikey ${apikey} not found, please register first!`
                                                });
                                                let limit = await isLimit(apikey);
                                                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                let result = await ch.getLatestHanime()
                                                res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                limitAdd(apikey);
                                            } catch (err) {
                                                console.log(err);
                                                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                              }
                                            });

                                            router.get('/animanga/mynimekulatest', async (req, res, next) => {
                                                try {
                                                    let apikey = req.query.apikey
                                                    if (apikey === undefined) return res.status(404).send({
                                                        status: 404,
                                                        message: `Input Parameter apikey`
                                                    });
                                                    const check = await cekKey(apikey);
                                                    if (!check) return res.status(403).send({
                                                        status: 403,
                                                        message: `apikey ${apikey} not found, please register first!`
                                                    });
                                                    let limit = await isLimit(apikey);
                                                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                    let result = await ch.getLatestAnime()
                                                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                    limitAdd(apikey);
                                                } catch (err) {
                                                    console.log(err);
                                                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                  }
                                                });

                                                router.get('/animanga/nekopoilasted', async (req, res, next) => {
                                                    try {
                                                        let apikey = req.query.apikey
                                                        if (apikey === undefined) return res.status(404).send({
                                                            status: 404,
                                                            message: `Input Parameter apikey`
                                                        });
                                                        const check = await cekKey(apikey);
                                                        if (!check) return res.status(403).send({
                                                            status: 403,
                                                            message: `apikey ${apikey} not found, please register first!`
                                                        });
                                                        let limit = await isLimit(apikey);
                                                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                        let result = await nekopoi.latest()
                                                        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                        limitAdd(apikey);
                                                    } catch (err) {
                                                        console.log(err);
                                                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                      }
                                                    });

                                                    router.get('/animanga/nekopoisearch', async (req, res, next) => {
                                                        try {
                                                            let q = req.query.q
                                                            let apikey = req.query.apikey
                                                            if (apikey === undefined) return res.status(404).send({
                                                                status: 404,
                                                                message: `Input Parameter apikey`
                                                            });
                                                            if (!q) return res.json({
                                                                status: false,
                                                                creator: `${creator}`,
                                                                message: "input pencarian kosong! isi terlebih dahulu!"
                                                            })
                                                            const check = await cekKey(apikey);
                                                            if (!check) return res.status(403).send({
                                                                status: 403,
                                                                message: `apikey ${apikey} not found, please register first!`
                                                            });
                                                            let limit = await isLimit(apikey);
                                                            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                            let result = await nekopoi.search(q)
                                                            res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                            limitAdd(apikey);
                                                        } catch (err) {
                                                            console.log(err);
                                                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                          }
                                                        });

                                                        router.get('/animanga/nekopoi', async (req, res, next) => {
                                                            try {
                                                            let code = req.query.code
                                                            let apikey = req.query.apikey
                                                            if (apikey === undefined) return res.status(404).send({
                                                                status: 404,
                                                                message: `Input Parameter apikey`
                                                             });
                                                            if (!code) return res.json({
                                                                status: false,
                                                                creator: `${creator}`,
                                                                message: "code tidak boleh kosong!"
                                                            })
                                                            const check = await cekKey(apikey);
                                                            if (!check) return res.status(403).send({
                                                                status: 403,
                                                                message: `apikey ${apikey} not found, please register first!`
                                                            });
                                                            let limit = await isLimit(apikey);
                                                            if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                            let result = await nekopoi.detail(code)
                                                                res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                                limitAdd(apikey);
                                                            } catch (err) {
                                                                console.log(err);
                                                                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                              }
                                                            });

                                                            router.get('/animanga/otakudesu', async (req, res, next) => {
                                                                try {
                                                                let url = req.query.url
                                                                let apikey = req.query.apikey
                                                                if (apikey === undefined) return res.status(404).send({
                                                                    status: 404,
                                                                    message: `Input Parameter apikey`
                                                                 });
                                                                if (!url) return res.json({
                                                                    status: false,
                                                                    creator: `${creator}`,
                                                                    message: "invalid url"
                                                                })
                                                                const check = await cekKey(apikey);
                                                                if (!check) return res.status(403).send({
                                                                    status: 403,
                                                                    message: `apikey ${apikey} not found, please register first!`
                                                                });
                                                                let limit = await isLimit(apikey);
                                                                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                                let result = await otaku.getdetail(url)
                                                                    res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                                    limitAdd(apikey);
                                                                } catch (err) {
                                                                    console.log(err);
                                                                    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                                  }
                                                                });

                                                                router.get('/animanga/otakudesu-search', async (req, res, next) => {
                                                                    try {
                                                                    let q = req.query.q
                                                                    let apikey = req.query.apikey
                                                                    if (apikey === undefined) return res.status(404).send({
                                                                        status: 404,
                                                                        message: `Input Parameter apikey`
                                                                     });
                                                                    if (!q) return res.json({
                                                                        status: false,
                                                                        creator: `${creator}`,
                                                                        message: "input pencarian kosong! isi terlebih dahulu!"
                                                                    })
                                                                    const check = await cekKey(apikey);
                                                                    if (!check) return res.status(403).send({
                                                                        status: 403,
                                                                        message: `apikey ${apikey} not found, please register first!`
                                                                    });
                                                                    let limit = await isLimit(apikey);
                                                                    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                                    let result = await otaku.getsearch(q)
                                                                        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                                        limitAdd(apikey);
                                                                    } catch (err) {
                                                                        console.log(err);
                                                                        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                                      }
                                                                    });

                                                                    router.get('/animanga/otakudesu-download', async (req, res, next) => {
                                                                        try {
                                                                        let url = req.query.url
                                                                        let apikey = req.query.apikey
                                                                        if (apikey === undefined) return res.status(404).send({
                                                                            status: 404,
                                                                            message: `Input Parameter apikey`
                                                                         });
                                                                        if (!url) return res.json({
                                                                            status: false,
                                                                            creator: `${creator}`,
                                                                            message: "invalid url"
                                                                        })
                                                                        const check = await cekKey(apikey);
                                                                        if (!check) return res.status(403).send({
                                                                            status: 403,
                                                                            message: `apikey ${apikey} not found, please register first!`
                                                                        });
                                                                        let limit = await isLimit(apikey);
                                                                        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                                        let result = await otaku.getdownload(url)
                                                                            res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                                            limitAdd(apikey);
                                                                        } catch (err) {
                                                                            console.log(err);
                                                                            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                                          }
                                                                        });

                                                                        router.get('/animanga/otakudesu-latest', async (req, res, next) => {
                                                                            try {
                                                                                let apikey = req.query.apikey
                                                                                if (apikey === undefined) return res.status(404).send({
                                                                                    status: 404,
                                                                                    message: `Input Parameter apikey`
                                                                                });
                                                                                const check = await cekKey(apikey);
                                                                                if (!check) return res.status(403).send({
                                                                                    status: 403,
                                                                                    message: `apikey ${apikey} not found, please register first!`
                                                                                });
                                                                                let limit = await isLimit(apikey);
                                                                                if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
                                                                                let result = await otaku.getongoing()
                                                                                res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
                                                                                limitAdd(apikey);
                                                                            } catch (err) {
                                                                                console.log(err);
                                                                                res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
                                                                              }
                                                                            });
                        
//==========================> NSFW AREA <==============================//

router.get('/nsfw/ahegao', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/ahegao`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/ass', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=ass&is_nsfw=true`))
    .then(response => response.json())
        .then(data => {
            
            var result = data.images[0].url;
            var requestSettings = {
                url: result,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
        })
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/anal', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/anal`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/blowjob', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://waifu.pics/api/nsfw/blowjob`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/bdsm', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/bdsm`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/classic', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/classic`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/boobjob', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/boobjob`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/boobs', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/boobs`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});


router.get('/nsfw/cum', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/cum`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/creampie', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/creampie`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/cuckold', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/cuckold`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/ecchi', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=ecchi&is_nsfw=true`))
    .then(response => response.json())
        .then(data => {
            
            var result = data.images[0].url;
            var requestSettings = {
                url: result,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
        })
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/ero', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/ero`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/ero2', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=ero&is_nsfw=true`))
    .then(response => response.json())
        .then(data => {
            
            var result = data.images[0].url;
            var requestSettings = {
                url: result,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
        })
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/elves', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/elves`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});


router.get('/nsfw/femdom', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/femdom`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/footjob', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/footjob`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/glasses', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/glasses`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/gangbang', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/gangbang`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/gif', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/gif`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/hentai', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/hentai`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/hentai2', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=hentai&is_nsfw=true`))
    .then(response => response.json())
        .then(data => {
            
            var result = data.images[0].url;
            var requestSettings = {
                url: result,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
        })
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/masturbation', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/masturbation`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/public', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/public`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/pantsu', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/pantsu`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/pussy', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/pussy`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/paizuri', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=paizuri&is_nsfw=true`))
    .then(response => response.json())
        .then(data => {
            
            var result = data.images[0].url;
            var requestSettings = {
                url: result,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
        })
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/orgy', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/orgy`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/oral', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=oral&is_nsfw=true`))
    .then(response => response.json())
        .then(data => {
            
            var result = data.images[0].url;
            var requestSettings = {
                url: result,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
        })
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/manga', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/manga`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/milf', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.im/search/?included_tags=milf&is_nsfw=true`))
    .then(response => response.json())
        .then(data => {
            
            var result = data.images[0].url;
            var requestSettings = {
                url: result,
                method: 'GET',
                encoding: null
            };
            request(requestSettings, function (error, response, body) {
                res.set('Content-Type', 'image/png');
                res.send(body);
        })
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/waifu', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.pics/nsfw/waifu`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/neko', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.pics/nsfw/neko`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/trap', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://api.waifu.pics/nsfw/trap`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/thighs', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/thighs`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/tentacles', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/tentacles`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/uniform', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/uniform`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

router.get('/nsfw/zettaiRyouiki', async (req, res, next) => {
    try{
    var apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://hmtai.hatsunia.cfd/v2/zettaiRyouiki`))
    .then(response => response.json())
    .then(async data => {
        let result = data
        let buffer = await fetch(data.url)
        res.type('png')
        res.send(await buffer.buffer())
    })
    limitAdd(apikey);   
} catch (err) {
    console.log(err);
    res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
}
});

//=====================> AREA STALK <=========================//

router.get('/stalk/ghstalk', async (req, res, next) => {
    try {
    let username = req.query.username
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!username) return res.json({
        status: false,
        creator: `${creator}`,
        message: "username tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.ghstalk(username)
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/stalk/ghstalk', async (req, res, next) => {
    try {
    let username = req.query.username
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!username) return res.json({
        status: false,
        creator: `${creator}`,
        message: "username tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.ghstalk(username)
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/stalk/stalkwattpad', async (req, res, next) => {
    try {
    let username = req.query.username
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!username) return res.json({
        status: false,
        creator: `${creator}`,
        message: "username tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.WattpadUser(username)
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/stalk/githubrepo', async (req, res, next) => {
    try {
    let name = req.query.name
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!name) return res.json({
        status: false,
        creator: `${creator}`,
        message: "name tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.githubrepo(name)
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/stalk/twiterstalk', async (req, res, next) => {
    try {
    let username = req.query.username
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!username) return res.json({
        status: false,
        creator: `${creator}`,
        message: "username tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.twitterstalk(username)
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/stalk/tiktokstalk', async (req, res, next) => {
    try {
    let username = req.query.username
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!username) return res.json({
        status: false,
        creator: `${creator}`,
        message: "username tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.tiktokstalk(username)
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/stalk/npminfo', async (req, res, next) => {
    try {
    let query = req.query.query
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!query) return res.json({
        status: false,
        creator: `${creator}`,
        message: "input pencarian kosong! isi terlebih dahulu!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    fetch(encodeURI(`https://registry.npmjs.org/${query}`))
           .then(response => response.json())
           .then(result => {
        res.status(200).json({ status: true, code: 200, creator: `${creator}`, result: result })
           })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

//==========================> AREA CREATOR <=============================//

router.get('/creator/circle', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.Circle().getImage(`${url}`)
         await fs.writeFileSync(__path +'/tmp/circle.png', img)
         await res.sendFile(__path+'/tmp/circle.png')
         await sleep(3000)
         await fs.unlinkSync(__path + '/tmp/circle.png')
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/removebg', async (req, res, next) => {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    limitAdd(apikey);
    // GET APIKEY? https://www.remove.bg/api
    removebg.FromUrl(url, 'fsBdYTGGKfRxsYfRPYD5wRDa').then(async () => res.status(200).sendFile(__path + '/hasil-url.png')).catch(err => res.status(400).json({ error: String(err) }))
   });

router.get('/creator/burn', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Burn()
    .setAvatar(req.query.url) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/burn.png', data)
    await res.sendFile(__path+'/tmp/burn.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/burn.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/gura', async (req, res, next) => {
    try {
    let name = req.query.name
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!name) return res.json({
        status: false,
        creator: `${creator}`,
        message: "name tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Gura()
    .setName(req.query.name) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/gfx.png', data)
    await res.sendFile(__path+'/tmp/gfx.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/gfx', async (req, res, next) => {
    try {
    let name = req.query.name
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!name) return res.json({
        status: false,
        creator: `${creator}`,
        message: "name tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Gfx1()
            .setName(req.query.name) 
            .toAttachment()
            let data = image.toBuffer()
            await fs.writeFileSync(__path +'/tmp/gfx.png', data)
            await res.sendFile(__path+'/tmp/gfx.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/gfx2', async (req, res, next) => {
    try {
    let name = req.query.name
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!name) return res.json({
        status: false,
        creator: `${creator}`,
        message: "name tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Gfx2()
            .setName(req.query.name) 
            .toAttachment()
            let data = image.toBuffer()
            await fs.writeFileSync(__path +'/tmp/gfx2.png', data)
            await res.sendFile(__path+'/tmp/gfx2.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/gfx3', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.text) return res.status(400).send({ 
        status: 400, message: 'input text tidak boleh kosong!', 
        result: 'error'
     })
     if (!req.query.text2) return res.status(400).send({ 
        status: 400, message: 'text2 tidak boleh kosong!',
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Gfx3()
    .setText1(req.query.text) 
    .setText2(req.query.text2) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/gfx.png', data)
    await res.sendFile(__path+'/tmp/gfx.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/gfx4', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.text) return res.status(400).send({ 
        status: 400, message: 'input text tidak boleh kosong!', 
        result: 'error'
     })
     if (!req.query.text2) return res.status(400).send({ 
        status: 400, message: 'text2 tidak boleh kosong!',
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Gfx4()
    .setText1(req.query.text) 
    .setText2(req.query.text2) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/gfx.png', data)
    await res.sendFile(__path+'/tmp/gfx.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/gfx5', async (req, res, next) => {
    try {
    let text = req.query.text
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "input text tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Gfx5()
    .setText(req.query.text) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/gfx.png', data)
    await res.sendFile(__path+'/tmp/gfx.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

    router.get('/creator/xnxx', async (req, res, next) => {
    try {
    let url = req.query.url
    let name = req.query.name
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    if (!name) return res.json({
        status: false,
        creator: `${creator}`,
        message: "name tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Xnxx()
            .setImage(req.query.url) 
            .setTitle(req.query.name)
            .toAttachment()
            let data = image.toBuffer()
            await fs.writeFileSync(__path +'/tmp/xnxx.png', data)
            await res.sendFile(__path+'/tmp/xnxx.png')
            await sleep(3000)
            await fs.unlinkSync(__path + '/tmp/xnxx.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/rip', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.Rip().getImage(`${url}`)
         await fs.writeFileSync(__path +'/tmp/rip.png', img)
         await res.sendFile(__path+'/tmp/rip.png')
         await sleep(3000)
         await fs.unlinkSync(__path + '/tmp/rip.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/gay', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.Gay().getImage(`${url}`)
         await fs.writeFileSync(__path +'/tmp/gay.png', img)
         await res.sendFile(__path+'/tmp/gay.png')
         await sleep(3000)
         await fs.unlinkSync(__path + '/tmp/gay.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/lisa', async (req, res, next) => {
    try {
    let text = req.query.text
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "input text tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.LisaPresentation().getImage(`${text}`)
         await fs.writeFileSync(__path +'/tmp/lisa.png', img)
         await res.sendFile(__path+'/tmp/lisa.png')
         await sleep(3000)
         await fs.unlinkSync(__path + '/tmp/lisa.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

    router.get('/creator/blur', async (req, res, next) => {
        try {
        let url = req.query.url
        let apikey = req.query.apikey
        let level = req.query.level
        if (apikey === undefined) return res.status(404).send({
            status: 404,
            message: `Input Parameter apikey`
         });
        if (!url) return res.json({
            status: false,
            creator: `${creator}`,
            message: "invalid url"
        })
        if (!level) return res.json({
            status: false,
            creator: `${creator}`,
            message: "level tidak boleh kosong!"
        })
        const check = await cekKey(apikey);
        if (!check) return res.status(403).send({
            status: 403,
            message: `apikey ${apikey} not found, please register first!`
        });
        let limit = await isLimit(apikey);
        if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
        let img = await new DIG.Blur().getImage(`${url}`, `${level}`)
         await fs.writeFileSync(__path +'/tmp/blur.png', img)
         await res.sendFile(__path+'/tmp/blur.png')
         await sleep(3000)
         await fs.unlinkSync(__path + '/tmp/blur.png')
        limitAdd(apikey);
        } catch (err) {
            console.log(err);
            res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
          }
        });

router.get('/creator/jojo', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Jo()
    .setImage(req.query.url) 
    .toBuild()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/jojo.png', data)
    await res.sendFile(__path+'/tmp/jojo.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/jojo.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/bonk', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.url) return res.status(400).send({ 
        status: 400, 
        message: 'url tidak boleh kosong!', result: 'error' 
    })
     if (!req.query.url2) return res.status(400).send({ 
        status: 400, message: 'url2 tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Bonk()
    .setAvatar1(req.query.url) 
    .setAvatar2(req.query.url2)
    .toBuild()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/bonk.png', data)
    await res.sendFile(__path+'/tmp/bonk.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/bonk.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/stonk', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.Stonk().getImage(`${url}`)
    await fs.writeFileSync(__path +'/tmp/stonk.png', img)
    await res.sendFile(__path+'/tmp/stonk.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/stonk.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/notstonk', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.NotStonk().getImage(`${url}`)
    await fs.writeFileSync(__path +'/tmp/notstonk.png', img)
    await res.sendFile(__path+'/tmp/notstonk.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/notstonk.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/discord', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.DiscordBlue().getImage(`${url}`)
    await fs.writeFileSync(__path +'/tmp/discord.png', img)
    await res.sendFile(__path+'/tmp/discord.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/discord.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/delete', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.Delete().getImage(`${url}`)
         await fs.writeFileSync(__path +'/tmp/delete.png', img)
         await res.sendFile(__path+'/tmp/delete.png')
         await sleep(3000)
         await fs.unlinkSync(__path + '/tmp/delete.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/komunis', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await Caxinha.canvas.comunism(`${url}`)
    await fs.writeFileSync(__path +'/tmp/comunis.png', img)
    await res.sendFile(__path+'/tmp/comunis.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/comunis.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/wanted', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await Caxinha.canvas.wanted(`${url}`)
    await fs.writeFileSync(__path +'/tmp/wanted.png', img)
    await res.sendFile(__path+'/tmp/wanted.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/wanted.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/wasted', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await Caxinha.canvas.wasted(`${url}`)
    await fs.writeFileSync(__path +'/tmp/wasted.png', img)
    await res.sendFile(__path+'/tmp/wasted.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/wasted.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/patrick', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Patrick()
    .setAvatar(req.query.url) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/pat.png', data)
    await res.sendFile(__path+'/tmp/pat.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/pat.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/spongebob', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Spo()
    .setAvatar(req.query.url) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/spo.png', data)
    await res.sendFile(__path+'/tmp/spo.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/spo.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/triggered', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await new DIG.Triggered().getImage(`${url}`)
    await fs.writeFileSync(__path +'/tmp/trigger.png', img)
    await res.sendFile(__path+'/tmp/trigger.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/trigger.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });
    
router.get('/creator/hornycard', async (req, res, next) => {
    try {
    let url = req.query.url
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!url) return res.json({
        status: false,
        creator: `${creator}`,
        message: "Invalid Url"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Horny()
    .setAvatar(req.query.url) 
    .toBuild()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/horny.png', data)
    await res.sendFile(__path+'/tmp/horny.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/horny.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });
    
router.get('/creator/changemymind', async (req, res, next) => {
    try {
    let text = req.query.text
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "input text tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let img = await yuricanvas.changemymind(`${text}`)
    await fs.writeFileSync(__path +'/tmp/cmm.png', img)
    await res.sendFile(__path+'/tmp/cmm.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/cmm.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/ship', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.name2) return res.status(400).send({ 
        status: 400, 
        message: 'name2 tidak boleh kosong!', 
        result: 'error'
     })
     if (!req.query.avatar) return res.status(400).send({ 
        status: 400, 
        message: 'avatar tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.avatar2) return res.status(400).send({ 
        status: 400, 
        message: 'avatar2 tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.num) return res.status(400).send({ 
        status: 400, 
        message: 'num tidak boleh kosong!', 
        result: 'error'
     })
     if (!req.query.status) return res.status(400).send({ 
        status: 400, 
        message: 'status tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Ship()
    .setName1(req.query.name) 
    .setName2(req.query.name2)
    .setAvatar1(req.query.avatar)
    .setAvatar2(req.query.avatar2)
    .setNum(req.query.num)
    .setStatus(req.query.status)
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/ship.png', data)
    await res.sendFile(__path+'/tmp/ship.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/ship.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/welcome', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'picurl tidak boleh kosong!', 
        result: 'error'
     })
     if (!req.query.name) return res.status(400).send({ 
        status: 400,
        message: 'name tidak boleh kosong!',
        result: 'error' 
    })
     if (!req.query.bgurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.gcname) return res.status(400).send({ 
        status: 400, 
        message: 'gcname tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.mem) return res.status(400).send({ 
        status: 400, 
        message: 'mem tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Welcome2()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name)
    .setBg(req.query.bgurl)
    .setGroupname(req.query.gcname)
    .setMember(req.query.mem)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/welcome.png', data)
    await res.sendFile(__path+'/tmp/welcome.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/welcome.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/welcome2', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.mem) return res.status(400).send({ 
        status: 400, 
        message: 'mem tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.gcname) return res.status(400).send({ 
        status: 400, 
        message: 'gcname tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'picurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.bgurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.gcicon) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Welcome()
    .setUsername(req.query.name)
    .setGuildName(req.query.gcname)
    .setGuildIcon(req.query.gcicon)
    .setMemberCount(req.query.mem)
    .setAvatar(req.query.picurl)
    .setBackground(req.query.bgurl)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/welcome2.png', data)
    await res.sendFile(__path+'/tmp/welcome2.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/welcome2.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/welcome3', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Welcome3()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/welcome3.png', data)
    await res.sendFile(__path+'/tmp/welcome3.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/welcome3.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/goodbye', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'picurl tidak boleh kosong!', 
        result: 'error'
     })
     if (!req.query.name) return res.status(400).send({ 
        status: 400,
        message: 'name tidak boleh kosong!',
        result: 'error' 
    })
     if (!req.query.bgurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.gcname) return res.status(400).send({ 
        status: 400, 
        message: 'gcname tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.mem) return res.status(400).send({ 
        status: 400, 
        message: 'mem tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Goodbye2()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name)
    .setBg(req.query.bgurl)
    .setMember(req.query.mem)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/goodbye.png', data)
    await res.sendFile(__path+'/tmp/goodbye.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/goodbye.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });
    
router.get('/creator/goodbye2', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.mem) return res.status(400).send({ 
        status: 400, 
        message: 'mem tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.gcname) return res.status(400).send({ 
        status: 400, 
        message: 'gcname tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'picurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.bgurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.gcicon) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Goodbye()
    .setUsername(req.query.name)
    .setGuildName(req.query.gcname)
    .setGuildIcon(req.query.gcicon)
    .setMemberCount(req.query.mem)
    .setAvatar(req.query.picurl)
    .setBackground(req.query.bgurl)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/goodbye2.png', data)
    await res.sendFile(__path+'/tmp/goodbye2.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/goodbye2.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/goodbye3', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Goodbye3()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name)
    .toAttachment();
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/goodbye3.png', data)
    await res.sendFile(__path+'/tmp/goodbye3.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/goodbye3.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/rankcard', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.currentxp) return res.status(400).send({ 
        status: 400, 
        message: 'currentxp tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.requiredxp) return res.status(400).send({ 
        status: 400, 
        message: 'requiredxp tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.level) return res.status(400).send({ 
        status: 400, 
        message: 'level tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'picurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Rank()
    .setAvatar(req.query.picurl)
    .setUsername(req.query.name) 
    .setBg(req.query.bgurl)
    .setNeedxp(req.query.requiredxp) 
    .setCurrxp(req.query.currentxp) 
    .setLevel(req.query.level) 
    .setRank("https://i.ibb.co/Wn9cvnv/FABLED.png") 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/card.png', data)
    await res.sendFile(__path+'/tmp/card.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/card.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/levelup', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let image = await new knights.Up()
    .setAvatar(req.query.picurl) 
    .toAttachment()
    let data = image.toBuffer()
    await fs.writeFileSync(__path +'/tmp/level.png', data)
    await res.sendFile(__path+'/tmp/level.png')
    await sleep(3000)
    await fs.unlinkSync(__path + '/tmp/level.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/promote', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.mem) return res.status(400).send({ 
        status: 400, 
        message: 'mem tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.msg) return res.status(400).send({ 
        status: 400, 
        message: 'msg tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'picurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.bgurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let canvas = require('discanvas')
    var welcomer = await new canvas.Welcome()
       .setAvatar(req.query.picurl)
       .setUsername(`${req.query.name}#${req.query.mem}`)
       .setBackground("BACKGROUND", req.query.bgurl)
       .setMainText("Promote")
       .setSecondText(req.query.msg)
       .toWelcome() 
       let data = welcomer.toBuffer()
       await fs.writeFileSync(__path +'/tmp/promote.png', data)
       await res.sendFile(__path+'/tmp/promote.png')
       await sleep(3000)
       await fs.unlinkSync(__path + '/tmp/promote.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/creator/demote', async (req, res, next) => {
    try {
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
     if (!req.query.name) return res.status(400).send({ 
        status: 400, 
        message: 'name tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.mem) return res.status(400).send({ 
        status: 400, 
        message: 'mem tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.msg) return res.status(400).send({ 
        status: 400, 
        message: 'msg tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.picurl) return res.status(400).send({ 
        status: 400, 
        message: 'picurl tidak boleh kosong!', 
        result: 'error' 
    })
     if (!req.query.bgurl) return res.status(400).send({ 
        status: 400, 
        message: 'bgurl tidak boleh kosong!', 
        result: 'error' 
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let canvas = require('discanvas')
    var welcomer = await new canvas.Welcome()
       .setAvatar(req.query.picurl)
       .setUsername(`${req.query.name}#${req.query.mem}`)
       .setBackground("BACKGROUND", req.query.bgurl)
       .setMainText("Demote")
       .setSecondText(req.query.msg)
       .toWelcome() 
       let data = welcomer.toBuffer()
       await fs.writeFileSync(__path +'/tmp/demote.png', data)
       await res.sendFile(__path+'/tmp/demote.png')
       await sleep(3000)
       await fs.unlinkSync(__path + '/tmp/demote.png')
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

//===========================> AREA ENTERTAINMENT <================================//

router.get('/entertainment/caklontong', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/lib/data/caklontong.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/family100', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let result = await scr.family100()
    res.status(200).json(result)
})

router.get('/entertainment/tebakchara', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/tebakchara.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/tebakgambar', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let result = await ch.tebakgambar()
    let img = await shorts(result.img)
    let jawab = result.jawaban
    res.status(200).json({ status: 200, creator: `${creator}`,  result: { pertanyaan: img, jawaban: jawab }})
})

router.get('/entertainment/asahotak', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/asahotak.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/siapakahaku', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/siapakahaku.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/susunkata', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/susunkata.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/tebakkata', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/tebakkata.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/tebakkalimat', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/tebakkalimat.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/tebaktebakan', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/tebaktebakan.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/tebakbendera', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/tebakbendera.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/tebakkimia', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/tebakkimia.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})

router.get('/entertainment/tebaklirik', async (req, res, next) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });  
	let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'
    });
    limitAdd(apikey);
    let game = JSON.parse(fs.readFileSync(__path +'/data/tebaklirik.json'))
    let result = game[Math.floor(Math.random() * game.length)]
    res.status(200).json(result)
})
//===========================> AREA PRIMBON <=====================================//

router.get('/primbon/artimimpi', async (req, res, next) => {
    try {
    let query = req.query.query
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!query) return res.json({
        status: false,
        creator: `${creator}`,
        message: "input pencarian kosong! isi terlebih dahulu!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.artimimpi(query)
    res.status(200).json(result)
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/primbon/artinama', async (req, res, next) => {
    try {
    let name = req.query.name
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!name) return res.json({
        status: false,
        creator: `${creator}`,
        message: "name tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await ch.artinama(name)
    res.status(200).json({ status: 200, creator: `${creator}`, result: result })
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/primbon/jadianpernikahan', async (req, res, next) => {
    try {
    let tanggal = req.query.tanggal
    let bulan = req.query.bulan
    let tahun = req.query.tahun
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!tanggal) return res.json({
        status: false,
        creator: `${creator}`,
        message: "tanggal tidak boleh kosong!"
    })
    if (!bulan) return res.json({
        status: false,
        creator: `${creator}`,
        message: "bulan tidak boleh kosong!"
    })
    if (!tahun) return res.json({
        status: false,
        creator: `${creator}`,
        message: "tahun tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await primbon.tanggal_jadian_pernikahan(tanggal, bulan, tahun)
    res.status(200).json(result)
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/primbon/jodoh', async (req, res, next) => {
    try {
    let name = req.query.name
    let apikey = req.query.apikey
    let pasangan = req.query.pasangan
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!name) return res.json({
        status: false,
        creator: `${creator}`,
        message: "name tidak boleh kosong!"
    })
    if (!pasangan) return res.json({
        status: false,
        creator: `${creator}`,
        message: "pasangan tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let hasil = await ch.ramalanJodoh(name, pasangan)
    res.status(200).json(hasil)
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/primbon/nomorhoki', async (req, res, next) => {
    try {
    let no = req.query.no
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!no) return res.json({
        status: false,
        creator: `${creator}`,
        message: "no tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await primbon.nomer_hoki(no)
    res.status(200).json(result)
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/primbon/nasib', async (req, res, next) => {
    try {
    let tanggal = req.query.tanggal
    let bulan = req.query.bulan
    let tahun = req.query.tahun
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!tanggal) return res.json({
        status: false,
        creator: `${creator}`,
        message: "tanggal tidak boleh kosong!"
    })
    if (!bulan) return res.json({
        status: false,
        creator: `${creator}`,
        message: "bulan tidak boleh kosong!"
    })
    if (!tahun) return res.json({
        status: false,
        creator: `${creator}`,
        message: "tahun tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await primbon.ramalan_nasib(tanggal, bulan, tahun)
    res.status(200).json(result)
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.get('/primbon/zodiak', async (req, res, next) => {
    try {
    let query = req.query.query
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!query) return res.json({
        status: false,
        creator: `${creator}`,
        message: "input pencarian kosong! isi terlebih dahulu!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    let result = await primbon.zodiak(query)
    res.status(200).json(result)
    limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });
//===========================>  AREA OTHER <======================================//

router.get('/other/chatgpt', async (req, res, next) => {
    try {
    let text = req.query.prompt
    let apikey = req.query.apikey
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `Input Parameter apikey`
     });
    if (!text) return res.json({
        status: false,
        creator: `${creator}`,
        message: "input text tidak boleh kosong!"
    })
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} not found, please register first!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'batas permintaan terlampaui (20 req/hari), hubungi pemilik untuk upgrade ke premium'});
    await ch.openai('chat', text)
    .then(data => {            
        res.json({ 
            status: true, 
            code: 200, 
            creator: `${creator}`,            
            result: data
        })
    })
        limitAdd(apikey);
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: 'terjadi kesalahan! silakan melaporkan ke owner via whatsapp', result: 'error' });
      }
    });

router.use(function (req, res) {

    res.status(404)
    .set("Content-Type", "text/html")
    .sendFile(__path + '/views/404.html');
});

module.exports = router
