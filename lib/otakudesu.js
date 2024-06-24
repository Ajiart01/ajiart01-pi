const axios = require("axios")
const cheerio = require("cheerio")
const jsdom = require("jsdom")
const https = require("https")

const { JSDOM } = jsdom
const isString = s => typeof s === "string"
const isNumber = n => typeof n === "number"
const isBoolean = b => typeof b === "boolean"
const virtualConsole = new jsdom.VirtualConsole()
virtualConsole.on("error", () => {}) // Ignore "Could not parse CSS stylesheet" error
                                     // https://stackoverflow.com/a/69958999
const agent = new https.Agent({
  rejectUnauthorized: false
})                                   // Ignore "Uncaught AxiosError: certificate has expired"
                                     // https://stackoverflow.com/a/62212128

class InvalidArguments extends TypeError {
  constructor(message) {
    super(message)
    this.name = "InvalidArguments"
  }
}

async function getsearch(title) {
  if(!title) throw new Error("Enter the anime title!")
  if(!isString(title)) throw new InvalidArguments(`The "title" argument must be of type string. Received ${typeof title}`)

  let { data } = await axios.get(`https://otakudesu.lol/?s=${encodeURIComponent(title)}&post_type=anime`)
  let $ = cheerio.load(data)
  let result = []

  let li = $("div.page > ul.chivsrc > li")
  li.each(function(i) {
    let html = $(li[i]).html()
    let obj = {}
    let _$ = cheerio.load(html)
    obj.thumbnail = _$("img.attachment-post-thumbnail").attr("src")
    obj.title = _$("h2 > a").text()
    obj.url = _$("h2 > a").attr("href")
    obj.id = obj.url.split("/").at(-2)

    let { document } = new JSDOM(html).window

    let genre = []
    document.querySelectorAll("div.set")[0].querySelectorAll("a").forEach(function(v) {
      genre.push({ name: v.innerHTML, url: v.getAttribute("href") })
    })
    obj.genre = genre
    obj.status = document.querySelectorAll("div.set")[1].innerHTML.split(": ")[1]
    obj.rating = Number(document.querySelectorAll("div.set")[2].innerHTML.split(": ")[1])

    result.push(obj)
  })
  return result
}

async function getdetail(urls) {
//  if(!isString(urls)) throw new InvalidArguments(`The "url" argument must be of type string. Received ${typeof urls}`)

  let { data, request } = await axios(urls)
  if(request.res.responseUrl == "https://otakudesu.lol/") throw new Error("Anime not found!")

  let $ = cheerio.load(data)
  let { document } = new JSDOM(data, { virtualConsole }).window
  let result = {
    [Symbol("creator")]: "Restu"
  }

  result.thumb = $("img.attachment-post-thumbnail").attr("src")
  result.info = {
    judul: document.querySelectorAll("div.infozingle > p > span")[0].innerHTML.split(": ")[1],
    judul_jepang: document.querySelectorAll("div.infozingle > p > span")[1].innerHTML.split(": ")[1],
    skor: document.querySelectorAll("div.infozingle > p > span")[2].innerHTML.split(": ")[1],
    produser: document.querySelectorAll("div.infozingle > p > span")[3].innerHTML.split(": ")[1].split(", "),
    episode: document.querySelectorAll("div.infozingle > p > span")[6].innerHTML.split(": ")[1],
    tanggal_rilis: document.querySelectorAll("div.infozingle > p > span")[8].innerHTML.split(": ")[1],
    studio: document.querySelectorAll("div.infozingle > p > span")[9].innerHTML.split(": ")[1],
    genre: document.querySelectorAll("div.infozingle > p > span")[10].innerHTML.split(": ")[1].split(", ").map(v => v.split(">")[1].split("<")[0])
  }
  result.sinopsis = $("div.sinopc").text()
  result.episode_list = []
  document.querySelectorAll("div.episodelist > ul > li").forEach(function(v) {
    let obj = {}
    let _$ = cheerio.load(v.innerHTML)
    obj.episode = _$("span > a").text()
    obj.url = _$("span > a").attr("href")
    obj.id = obj.url.split("/").at(-2)
    result.episode_list.push(obj)
  })
  result.episode_list.reverse()

  return result
}

async function getdownload(urls, batch = false) {
 // if(!isString(urls)) throw new InvalidArguments(`The "url" argument must be of type string. Received ${typeof urls}`)
//  if(!isBoolean(batch)) throw new InvalidArguments(`The "batch" argument must be of type boolean. Received ${typeof batch}`)

  let { data, request } = await axios({
    url: urls,
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; RMX2189) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.0.0 Mobile Safari/537.36"
    }
  })
  if(request.res.responseUrl == "https://otakudesu.lol/") throw new Error("Episode not found!")

  let $ = cheerio.load(data)
  let thumb = $("img.attachment-post-thumbnail").attr("src")
  let iframe = $("div.responsive-embed-stream > iframe").attr("src")
  let selector = !batch ? "div.venutama > div.download > ul > li" : "div.download2 > div.batchlink > ul > li"

  let list = $(selector)
  let result = []
  for(let v of list) {
    let _$ = cheerio.load(v)
    let tmp = {}
    tmp.quality = _$("strong").text()
    tmp.size = _$("i").text()
    tmp.url = {}
    for(let v of _$("a")) {
      let _$ = cheerio.load(v)
      let type = _$("a").text()
      try {
        let url = (await axios.get(_$("a").attr("href"), { httpsAgent: agent }))?.request?._redirectable?._currentUrl || ""
        tmp.url[type] = url
      } catch(e) {
        if(e?.request?._currentUrl) tmp.url[type] = e?.request?._currentUrl
        else if(e?.response?.status == 404) continue
        else if(e?.response?.status == 503) tmp.url[type] = e?.request?._redirectable?._currentUrl
        else throw e
      }
    }
    result.push(tmp)
  }

  return {
       thumbnail: thumb,
       stream: iframe,
       link: result
  }
}

async function getongoing(page) {
  if(!isNumber(page) && page != undefined) throw new InvalidArguments(`The "page" argument must be of type number. Received ${typeof page}`)

  let url = "https://otakudesu.lol/ongoing-anime/"
  if(!isNaN(page) && page > 1) url += "page/" + page + "/"

  let { data } = await axios(url)
  let $ = cheerio.load(data)

  let result = []

  let selector = $("div.rapi > div.venz > ul > li")
  selector.each(function() {
    let title = $(this).find("div.detpost > div.thumb > a > div.thumbz > h2").text()
    let thumb = $(this).find("div.detpost > div.thumb > a > div.thumbz > img").attr("src")
    let eps = $(this).find("div.detpost > div.epz").text().trim().split(" ")[1] * 1
    let day = $(this).find("div.detpost > div.epztipe").text().trim()
    let date = $(this).find("div.detpost > div.newnime").text().trim()
    let link = $(this).find("div.detpost > div.thumb > a").attr("href")
    let id = link.split("/").at(-2)

    result.push({ title, thumb, eps, day, date, link, id })
  })

  return result
}

module.exports = { getsearch, getdetail, getdownload, getongoing }