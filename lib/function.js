const fs = require('fs-extra');
const crypto = require('crypto');
const fetch = require('node-fetch');
const PDFDocument = require('pdfkit')
const { default: axios, isAxiosError } = require("axios");
const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789'.split('');


const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

function randomText(len) {
    const result = [];
    for (let i = 0; i < len; i++) result.push(pool[Math.floor(Math.random() * pool.length)]);
    return result.join('');
}

function readFileTxt(file) {
    return new Promise((resolve, reject) => {
        const data = fs.readFileSync(file, 'utf8');
        const array = data.toString().split('\n') ;
        const random = array[Math.floor(Math.random() * array.length)];
        resolve(random.replace('\r', ''));
    })
}

function readFileJson(file) {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.parse(fs.readFileSync(file));
        const index = Math.floor(Math.random() * jsonData.length);
        const random = jsonData[index];
        resolve(random);
    })
}

const getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (e) {
        console.log(`Error : ${e}`)
    }
}

function ignoreFavicon(req, res, next) {
    if (req.originalUrl.includes('favicon')) {
      res.status(204).end()
    }
    next();
}

const download_Url = function(uri, filename, callback){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
};

function addWaktu(userIp) {
    const obj = {ip: `${userIp}`, time: Date.now()}
    waktu.push(obj)
    fs.writeFileSync('./lib/data/cooldown.json', JSON.stringify(waktu))
}

function getWaktu(userIp) {
    let index = waktu.findIndex(x => x.ip == `${userIp}`)
    if (index !== -1) {
        return waktu[index].time
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function shorts(url) {
    const res = await axios.get('https://tinyurl.com/api-create.php?url='+url)
    return res.data
  }

  function toPDF(images, opt = {}) {
	return new Promise(async (resolve, reject) => {
		if (!Array.isArray(images)) images = [images]
		let buffs = [], doc = new PDFDocument({ margin: 0, size: 'A4' })
		for (let x = 0; x < images.length; x++) {
			if (/.webp|.gif/.test(images[x])) continue
			let data = (await axios.get(images[x], { responseType: 'arraybuffer', ...opt })).data
			doc.image(data, 0, 0, { fit: [595.28, 841.89], align: 'center', valign: 'center' })
			if (images.length != x + 1) doc.addPage()
		}
		doc.on('data', (chunk) => buffs.push(chunk))
		doc.on('end', () => resolve(Buffer.concat(buffs)))
		doc.on('error', (err) => reject(err))
		doc.end()
	})
}

module.exports = { readFileTxt, readFileJson, getHashedPassword, generateAuthToken, randomText,
    ignoreFavicon, download_Url, addWaktu, getWaktu, shorts,  getBuffer, sleep, toPDF };
