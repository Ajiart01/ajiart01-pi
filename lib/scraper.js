const request = require('request')
const cheerio = require('cheerio')
const axios = require('axios')
const fetch = require('node-fetch')
const fs = require('fs')
const PDFDocument = require("pdfkit")
const { Configuration, OpenAIApi } = require("openai")
const { shorts } = require('./function')
const { uploadImage } = require('./uploadImage.js')
const { webp2png } = require('./webp2mp4.js')


function pinterest(query){
	return new Promise(async(resolve,reject) => {
		 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + query, {
			headers: {
			"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
		}
			}).then(({ data }) => {
		const $ = cheerio.load(data)
		const result = [];
		const hasil = [];
   		 $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
            result.push(link)
		});
   		result.forEach(v => {
		 if(v == undefined) return
		 hasil.push(v.replace(/236/g,'736'))
			})
			hasil.shift();
		resolve(hasil)
		})
	})
}

function pinterestdl(url) {
    return new Promise((resolve, reject) => {
        axios.request({
            url: 'https://www.expertsphp.com/facebook-video-downloader.php',
            method: "POST",
            data: new URLSearchParams(Object.entries({url: url})),
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const img = $('#showdata > div:nth-child(4) > table > tbody > tr:nth-child(2) > td:nth-child(1) > a').attr('href')
            const vid = $('#showdata > div:nth-child(4) > table > tbody > tr:nth-child(1) > td:nth-child(1) > a').attr('href')
            const result = { img, vid }
                if (typeof vid == 'undefined') return resolve({ result: img })
                resolve({ result: vid })
        })
    })
}

const mediafireDl = async (url) => {
const res = await axios.get(url) 
const $ = cheerio.load(res.data)
const hasil = {}
const link = $('a#downloadButton').attr('href')
const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
const seplit = link.split('/')
const nama = seplit[5]
mime = nama.split('.')
mime = mime[1]
hasil.title = nama 
hasil.size = size
hasil.link = link
return hasil
}

function igDownload(Url) {
  return new Promise((resolve, reject) => {
    axios.get('https://snapinsta.app/', {
      headers: {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
      }
    }).then(res => {
      const cookie = res.headers[`set-cookie`][0].replace('; path=/', '')
      const data = {
        url: Url,
        action: 'post'
      }
      axios.request({
        url: 'https://snapinsta.app/action.php',
        method: 'post',
        data: new URLSearchParams(Object.entries(data)),
        headers: {
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
          'cookie': cookie
        }
      }).then(data => {
        const $ = cheerio.load(data.data)
        const result = []
        $('div.row.download-box > div.col-md-4').each((a, b) => {
          let link = $(b).find('div.download-items > div.download-items__btn > a.abutton').attr('href');
          result.push(link)
        })
        resolve(result)
      })
    })
  })
}

function igStory(username) {
	return new Promise((resolve, reject) => {
		axios.request({
			url: 'https://storydownloader.app/',
			method: 'GET',
			headers: {
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"		
			}
		}).then(response => {
			const ch = cheerio.load(response.data)
			const token = ch('#token').attr('value')
			let data = {
				token: token,
				username: username,
				stp: 1
			}
			axios.request({
				url: 'https://storydownloader.app/process/',
				method: 'POST',
				data: new URLSearchParams(Object.entries(data)),
				headers: {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": response.headers["set-cookie"],
					"accept": "application/json, text/javascript, */*; q=0.01"
				}
			}).then(res => {
				const hc = cheerio.load(res.data.html)
				const medias = []
				hc('figure').each(function (a, b) {
					const url = hc(b).find('img').attr('src')
					medias.push(url)
				})
				const hasil = {
					title: hc('h1').text(),
					profile_pic: hc('img').attr('src'),
					medias: medias
				}
				resolve(hasil)
			}).catch(reject)
		}).catch(reject)
	})
}

function scdl(url) {
	return new Promise(async (resolve, reject) => {
		await axios.request({
			url: "https://www.klickaud.co/download.php",
			method: "POST",
			data: new URLSearchParams(Object.entries({'value': url, 'afae4540b697beca72538dccafd46ea2ce84bec29b359a83751f62fc662d908a' : '2106439ef3318091a603bfb1623e0774a6db38ca6579dae63bcbb57253d2199e'})),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const result = {
				link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0],
				thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
				title: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text()

			}
			resolve(result)
		}).catch(reject)
   })
}

function anonfiledl(url) {
	return new Promise((resolve, reject) => {
		if (!/https?:\/\//.test(url)) return reject('Invalid url!')
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text().replace('- AnonFiles', '').trim()
			let size = $('#download-url').text().split('\n')[1].replace(/ /g, '').replace(/\(|\)/g, '')
			let link = $('#download-url').attr('href')
			link = encodeURI(link)
			resolve({ title, size, link })
		}).catch(reject)
	})
}

function sfiledl(url) {
	return new Promise((resolve, reject) => {
		if (!/https?:\/\//.test(url)) return reject('Invalid url!')
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('div.w3-row-padding').find('b').text().trim()
			let size = $('#download').text().replace(/download file/i, '').replace(/\(|\)/g, '').trim()
			let link = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
			resolve({ title, size, link })
		}).catch(reject)
	})
}

function sfilesearch(query, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`https://sfile.mobi/search.php?q=${query}&page=${page}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.list').each(function(i, e) {
				let title = $(e).find('a').text()
				let size = $(e).text().trim().split('(')[1]
				let link = $(e).find('a').attr('href')
				if (link !== undefined) result.push({ title, size: size.replace(')', ''), link })
			})
			resolve(result)
		}).catch(reject)
	})
}


function stickerDl(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(res => {
			const $ = cheerio.load(res.data)
			const link = []
			const main = $('#stickerPack > div > div.row > div > img')

			main.each( function() {
				const result_link = $(this).attr('src').split('&d=')[0]
				const result_thumb = $('#intro > div > div > img').attr('src')
				const result_title = $('#intro > div > div > h1').text()
				link.push(result_link)	
				const result = {
					title: result_title,
					thumb: result_thumb,
					result: link
				}
			resolve(result)
			})
		}).catch(resolve)
	})
}

function pixivDl(id, ext) {
	return new Promise((resolve, reject) => {
		const result = 'https://pixiv.cat/'+id+ext
		resolve(result)
	})
}

function xnxxDl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, { method: 'get' })
      .then((res) => res.text())
      .then((res) => {
        let $ = cheerio.load(res, {
          xmlMode: false,
        });
        const title = $('meta[property="og:title"]').attr('content');
        const videoScript = $('#video-player-bg > script:nth-child(6)').html();
        const files = {
          low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
          high: (videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);') || [])[1],
        };

        // Cobalah mengekstrak durasi video dari video player
        const durationMatch = videoScript.match(/"duration":(\d+),/);
        const durationSeconds = durationMatch ? parseInt(durationMatch[1]) : null;

        resolve({ title, files, duration: durationSeconds });
      })
      .catch(reject);
  });
}

function musicaldown(URL) {
    return new Promise((resolve, rejecet) => {
        axios.get('https://musicaldown.com/id', {
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            }
        }).then(res => {
            const $ = cheerio.load(res.data)
            const url_name = $("#link_url").attr("name")
            const token_name = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("name")
            const token_ = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(2)").attr("value")
            const verify = $("#submit-form > div").find("div:nth-child(1) > input[type=hidden]:nth-child(3)").attr("value")
            let data = {
                [`${url_name}`]: URL,
                [`${token_name}`]: token_,
                verify: verify
            }
        axios.request({
            url: 'https://musicaldown.com/id/download',
            method: 'post',
            data: new URLSearchParams(Object.entries(data)),
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(respon => {
            const ch = cheerio.load(respon.data)
        axios.request({
            url: 'https://musicaldown.com/id/mp3',
            method: 'post',
            headers: {
                'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                'cookie': res.headers["set-cookie"]
            }
        }).then(resaudio => { 
            const hc = cheerio.load(resaudio.data)       
            const result = {
                video: ch('body > div.welcome.section > div').find('div:nth-child(2) > div.col.s12.l8 > a:nth-child(4)').attr('href'),
                audio: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(4)').attr('href'),
                nowm: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(6)').attr('href'),
                video_original: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(8)').attr('href'),
                audio_original: hc('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l8 > a:nth-child(8)').attr('href'),
                preview: ch('body > div.welcome.section > div > div:nth-child(2) > div.col.s12.l4 > img').attr('src')
            }
        resolve(result)
      })
    })
  })
})
}

function zippyshare(urls) {
    return new Promise((resolve, reject) => {
        axios.get(urls).then(({ data }) => {
            const $ = cheerio.load(data)
            const li = $.html()
            const po = $('#dlbutton').next().html()
            const le = po.split(';')[0]
            const lo = le.split("document.getElementById('dlbutton').href =")[1]
            const result = `${urls.split('/v')[0]}${eval(lo)}`
            const ho = $('#lrbox').text().replace(/\n/g, '')
			const hasil = {
                nama: ho.split('Name:')[1].split('Size:')[0].trim(),
                ukuran: ho.split('Size:')[1].split('Uploaded:')[0].trim(),
                up_at: ho.split('Uploaded:')[1].split('          ')[0].trim(),
                link: result
            }
            resolve(hasil)
        })
    })
}

function getLatestAnime() {
	return new Promise((resolve, reject) => {
		axios.get('https://www.mynimeku.com/').then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox-item > a').each(function(i, e) {
				let title = $(e).attr('title')
				let link = $(e).attr('href')
				let status = $(e).find('div.flexbox-status').text()
				let thumb = $(e).find('div.flexbox-thumb > img').attr('data-src')
				let episode = $(e).find('div.flexbox-episode > span.eps').text().split(' ')[1]
				let type = $(e).find('div.flexbox-type').text()
				result.push({ title, status, episode, type, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function getLatestKomik() {
	return new Promise((resolve, reject) => {
		axios.get('https://www.mynimeku.com/').then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox4-item').each(function(i, e) {
				let title = $(e).find('a').attr('title')
				let link = $(e).find('a').attr('href')
				let thumb = $(e).find('div.flexbox4-thumb > img').attr('data-src')
				let type = $(e).find('div.flexbox4-type').text()
				let status = $(e).find('div.flexbox-status').text()
				let chapter = $(e).find('ul.chapter > li').text().split(' ')[1]
				result.push({ title, status, chapter, type, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function kusoNime(query) {
    return new Promise(async (resolve, reject) => {
      const optionsGet = {
        method: 'GET',
        headers: {
           'user-agent': 'Mozilla/5.0 (Linux; Android 9; Redmi 7A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.99 Mobile Safari/537.36'
        }
    }
    const getHtml = await fetch('https://kusonime.com/?s=' + query + '&post_type=anime', optionsGet).then(rsp => rsp.text())
    const $ = cheerio.load(getHtml)
    const url = []
    $('div > div > ul > div > div > div').each(function() {
      url.push($(this).find('a').attr('href'))
    })
    const randomUrl = url[Math.floor(Math.random() * url.length)]
    const getHtml2 = await fetch(randomUrl, optionsGet).then(rsp => rsp.text())
    const $$ = cheerio.load(getHtml2)
    resolve({
      status: 200,
      result: {
        title: $$('.vezone > .venser').find('.jdlz').text(),
        thumb: $$('.vezone > .venser').find('div > img').attr('src'),
        views: $$('.vezone > .venser').find('div > div > span').text().trim().replace(' Views', ''),
        genre: $$('.vezone > .venser').find('.lexot > .info > p').eq(1).text().replace('Genre : ', ''),
        seasons: $$('.vezone > .venser').find('.lexot > .info > p').eq(2).text().replace('Seasons : ', ''),
        producers: $$('.vezone > .venser').find('.lexot > .info > p').eq(3).text().replace('Producers: ', ''),
        type: $$('.vezone > .venser').find('.lexot > .info > p').eq(4).text().replace('Type: ', ''),
        status: $$('.vezone > .venser').find('.lexot > .info > p').eq(5).text().replace('Status: ', ''),
        rating: $$('.vezone > .venser').find('.lexot > .info > p').eq(7).text().replace('Score: ', ''),
        duration: $$('.vezone > .venser').find('.lexot > .info > p').eq(8).text().replace('Duration: ', ''),
        release: $$('.vezone > .venser').find('.lexot > .info > p').eq(9).text().replace('Released on: ', ''),
        desc: $$('.vezone > .venser').find('p').eq(10).text(),
        url: randomUrl
      }
    })
  })
}

function doujindesuSearch(query) {
	return new Promise((resolve, reject) => {
		axios.get(`https://doujindesu.tv/?s=${query}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(i, e) {
				let title = $(e).find('div.title').text().trim()
				let score = $(e).find('div.score').text().trim()
				let type = $(e).find('div.type').text().replace(/Publishing|Finished/i, '')
				let status = $(e).find('div.type').text().replace(/Manhwa|Manga|Doujinshi/i, '')
				let thumb = $(e).find('img').attr('src')
				let link = $(e).find('a').attr('href')
				result.push({ title, score, type, status, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function doujindesuDl(url) {
	return new Promise((resolve, reject) => {
	  axios.get(url, {
		headers: {
		  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36'
		}
	  }).then(({ data }) => {
		let $ = cheerio.load(data);
		let title = $('div.lm').find('h1').text().replace('.', '').trim();
		let link_dl = $('div.chright').find('a').attr('href');
		let image = [];
		$('div.reader-area > img').each(function(a, b) {
		  image.push($(b).attr('src'));
		});
		resolve({ title, link_dl, image });
	  }).catch(reject);
	});
}  

function doujindesuLatest() {
	return new Promise((resolve, reject) => {
		axios.get(`https://doujindesu.tv/`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(a, b) {
				let title = $(b).find('a').attr('alt')
				let chapter = $(b).find('div.plyepisode').find('a').text().trim()
				let type = $(b).find('div.type').text()
				let score = $(b).find('div.score').text().trim()
				let thumb = $(b).find('img').attr('src')
				let link = $(b).find('div.plyepisode').find('a').attr('href')
				result.push({ title, chapter, type, score, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function mynimeSearch(query) {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.mynimeku.com/?s=${query}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox2-item').each(function(i, e) {
				let title = $(e).find('a').attr('title')
				let link = $(e).find('a').attr('href')
				let studio = $(e).find('span.studio').text() || '-'
				let type = $(e).find('div.type').text()
				let score = $(e).find('div.info > div.score').text().trim()
				let season = $(e).find('div.season > a').text() || '-'
				let synopsis = $(e).find('div.synops').text()
				let thumb = $(e).find('div.flexbox2-thumb > img').attr('src')
				result.push({ title, type, score, season, studio, synopsis, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function getInfoAnime(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('div.series-titlex').find('h2').text()
			let type = $('span.type').text()
			let status = $('span.status').text()
			let score = $('div.series-infoz.score > span').text()
			let premiered = $('div.series-info > ul > li:nth-child(3) > span').text().trim()
			let studios = $('div.series-info > ul > li:nth-child(4) > span').text().trim()
			let english = $('div.series-info > ul > li:nth-child(6) > span').text()
			let japanese = $('div.series-title > span').text()
			let genre = $('div.series-genres > a').text()
			let synopsis = $('div.series-synops > p').text()
			let thumb = $('div.series-thumb > img').attr('src')
			let list_eps = []
			$('div.flexeps-infoz > a').each(function(a, b) {
				list_eps.push({ title: $(b).attr('title'), link: $(b).attr('href') })
			})
			resolve({ title, japanese, english, type, status, score, premiered, studios, genre, synopsis, thumb, list_eps })
		}).catch(reject)
	})
}

function getLatestHanime() {
	return new Promise((resolve, reject) => {
		let url = 'https://hanime.tv'
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.elevation-3').each(function(a, b) {
				let title = $(b).find('a').attr('alt')
				let link = url + $(b).find('a').attr('href')
				result.push({ title, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function artinama(nama) {
	return new Promise((resolve, reject) => {
		axios.get('http://www.primbon.com/arti_nama.php?nama1='+nama+'&proses=+Submit%21+').then(res => {
		const $ = cheerio.load(res.data)
		const r = $('#body').text();
		const re = r.split('\n      \n        \n        \n')[0]
		const result = re.trim()
		resolve(result)
		})
	})
}

function artimimpi(mimpi) {
    return new Promise((resolve, reject) => {
       axios.get(`https://www.primbon.com/tafsir_mimpi.php?mimpi=${mimpi}&submit=+Submit+`)
          .then(({
              data
        }) => {
        const $ = cheerio.load(data)
        const detect = $('#body > font > i').text()
        const isAva = /Tidak ditemukan/g.test(detect) ? false : true
        if (isAva) {
            const isi = $('#body').text().split(`Hasil pencarian untuk kata kunci: ${mimpi}`)[1].replace(/\n\n\n\n\n\n\n\n\n/gi, '\n')
            const res = {
                status: 200,
                result: isi
             }
             resolve(res)
         } else {
            const res = {
                 status: 404,
                 result: `Arti Mimpi ${mimpi} Tidak Di Temukan`
              }
              resolve(res)
           }
       })
     .catch(reject)
  })
}

function ramalanJodoh(nama, pasangan) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.primbon.com/kecocokan_nama_pasangan.php?nama1='+nama+'&nama2='+pasangan+'&proses=+Submit%21+').then(res => {
		const $ = cheerio.load(res.data)
		const thumb = 'https://www.primbon.com/'+$('#body > img').attr('src')
		const isi = $('#body').text().split(pasangan)[1].replace('< Hitung Kembali','').split('\n')[0]
      		const positif = isi.split('Sisi Negatif Anda: ')[0].replace('Sisi Positif Anda: ','')
      		const negatif = isi.split('Sisi Negatif Anda: ')[1]
      		const result = {
      			thumb: thumb,
      			positif: positif,
      			negatif: negatif
      		}
      		resolve(result)
		})

	})
}

function konachan(q) {
	return new Promise((resolve, reject) => {
		let query = q.replace(/ /g, '_')
		axios.get('https://konachan.net/post?tags='+query+'+').then(res => {
			const $ = cheerio.load(res.data)
			const aray = []
			$('div.pagination > a').each(function(a, b) {
				const u = $(b).text()
				aray.push(u)
				let math = Math.floor(Math.random() * aray.length)
				axios.get('https://konachan.net/post?page='+math+'&tags='+query+'+').then(respon => {
					const ch = cheerio.load(respon.data)
					const result = []
					ch('#post-list > div.content > div:nth-child(4) > ul > li > a.directlink.largeimg').each(function(c, d) {
						const r = $(d).attr('href')
						result.push(r)
					})
					resolve(result)
				}).catch(reject)
			})
		}).catch(reject)
	})
}

function happymodSearch(query) {
	return new Promise((resolve, reject) => {
		const baseUrl = 'https://www.happymod.com/'
		axios.get(baseUrl+'search.html?q='+query).then(async res => {
		var $ = cheerio.load(res.data)
		const hasil = []
		$("div.pdt-app-box").each(function(c, d) {
			var title = $(d).find("a").text().trim();
			var icon = $(d).find("img.lazy").attr('data-original');
			var rating = $(d).find("span").text();
			var link = baseUrl+$(d).find("a").attr('href');
			hasil.push({
				title,
				icon,
				link,
				rating
			})
	})
		resolve(hasil)
		console.log(hasil)
	}).catch(reject)
})
}

function searchIlust(query) {
	return new Promise((resolve, reject) => { 
		axios.get('https://api.lolicon.app/setu/v2?&size=regular&num=100&keyword='+query).then(res => {
			const result = res.data.data
      if (result.length < 1) {
          throw 'Hasil tidak di temukan!'
      } else {
        resolve(result)
      }
		})
	})
}

function stickerSearch(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://getstickerpack.com/stickers?query='+query).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#stickerPacks > div > div:nth-child(3) > div > a')

			main.each( function() {
				const url = $(this).attr('href')
				const title = $(this).find('div > span').text()
				result.push({ title, url })
			})
			resolve(result)
		}).catch(reject)
	})
}
function xnxxSearch(query) {
	return new Promise((resolve, reject) => {
	  const baseurl = 'https://www.xnxx.com'
	  fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, { method: 'get' })
		.then(res => res.text())
		.then(res => {
		  let $ = cheerio.load(res, {
			xmlMode: false
		  });
		  let title = [];
		  let url = [];
		  let desc = [];
		  let image = []; // Tambahkan array untuk URL gambar
  
		  $('div.mozaique').each(function (a, b) {
			$(b).find('div.thumb').each(function (c, d) {
			  url.push(baseurl + $(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
			  // Ambil URL gambar miniatur dan tambahkan ke dalam array
			  image.push($(d).find('img').attr('data-src'))
			})
		  })
		  $('div.mozaique').each(function (a, b) {
			$(b).find('div.thumb-under').each(function (c, d) {
			  desc.push($(d).find('p.metadata').text())
			  $(d).find('a').each(function (e, f) {
				title.push($(f).attr('title'))
			  })
			})
		  })
		  let results = [];
  
		  for (let i = 0; i < title.length; i++) {
			results.push({
			  title: title[i],
			  desc: desc[i], // Menambahkan deskripsi ke dalam hasil
			  link: url[i],
			  image: image[i] // Menambahkan URL gambar ke dalam hasil
			})
		}
		
		resolve(results)
		})
	})
	.catch(err => reject({ code: 503, status: false, result: err }))
}

function alphacoders(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://wall.alphacoders.com/search.php?search='+query).then(res => {
            const $ = cheerio.load(res.data)
            const result = []
            $('div.boxgrid > a > picture').each(function(a, b) {
                result.push($(b).find('img').attr('src').replace('thumbbig-', ''))
            })
            resolve(result)
        }).catch(reject)
    })
}

function wallpapercave(query) {
    return new Promise((resolve, reject) => {
		axios.get('https://wallpapercave.com/search?q='+query).then(res => {
				const $ = cheerio.load(res.data)
				const result = [];
				$('div.imgrow > a').each(function(a, b) {
					if (!$(b).find('img').attr('src').includes('.gif')) {
						result.push('https://wallpapercave.com/' + $(b).find('img').attr('src').replace('fuwp', 'uwp'))
					}
				})
				resolve(result)
			}).catch(reject)
	})
}


async function _tebakgambar() {
	return new Promise((resolve, reject) => {
		axios.get('https://jawabantebakgambar.net/all-answers/').then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			$('#images > li > a').each(function(a, b) {
				const img = 'https://jawabantebakgambar.net'+$(b).find('img').attr('data-src')
				const jawaban = $(b).find('img').attr('alt').replace('Jawaban ', '')
				result.push({ img, jawaban })
			})
			resolve(result)
		}).catch(reject)
	})
}

async function tebakgambar() {
	return new Promise(async(resolve, reject) => {
		let ctrl = await _tebakgambar()
		let ct = await  ctrl[Math.floor(Math.random() * ctrl.length)]
		resolve(ct)
	})
}

function ghstalk(username) {
    url= `https://api.github.com/users/${username}`; 
    return axios.get(url).then(({ data }) => {
    return data
})
}

function herodetails(name) {
    return new Promise((resolve, reject) => {
        var splitStr = name.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
              splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
            }
              const que = splitStr.join(' ')
              axios.get('https://mobile-legends.fandom.com/wiki/' + que)
               .then(({ data }) => {
                       const $ = cheerio.load(data)
                       let mw = []
                       let attrib = []
                       let skill = []
                       const name = $('#mw-content-text > div > div > div > div > div > div > table > tbody > tr > td > table > tbody > tr > td > font > b').text() 
                       $('.mw-headline').get().map((res) => {
                            const mwna = $(res).text()
                            mw.push(mwna)
                       })
                       $('#mw-content-text > div > div > div > div > div > div > table > tbody > tr > td').get().map((rest) => {
                            const haz = $(rest).text().replace(/\n/g,'')
                            attrib.push(haz)
                       })
                       $('#mw-content-text > div > div > div > div > div > div > table > tbody > tr > td > div.progressbar-small.progressbar > div').get().map((rest) => {
                            skill.push($(rest).attr('style').replace('width:',''))
                       })
                       axios.get('https://mobile-legends.fandom.com/wiki/' + que + '/Story')
                       .then(({ data }) => {
                            const $ = cheerio.load(data)
                            let pre = []
                            $('#mw-content-text > div > p').get().map((rest) => {
                                 pre.push($(rest).text())
                            })
                            const story = pre.slice(3).join('\n')
                            const items = []
                            const character = []
                            $('#mw-content-text > div > aside > section > div').get().map((rest) => {
                                 character.push($(rest).text().replace(/\n\t\n\t\t/g, '').replace(/\n\t\n\t/g,'').replace(/\n/g,''))
                            })
                            $('#mw-content-text > div > aside > div').get().map((rest) => {
                                 items.push($(rest).text().replace(/\n\t\n\t\t/g, '').replace(/\n\t\n\t/g,'').replace(/\n/g,''))
                            })
                            const img = $('#mw-content-text > div > aside > figure > a').attr('href')
                            const chara = character.slice(0,2)
                            const result = { 
                                 hero_name: name + ` ( ${mw[0].replace('CV:',' CV:')} )`,
                                 entrance_quotes: attrib[2].replace('Entrance Quotes','').replace('\n',''),
                                 hero_feature: attrib[attrib.length - 1].replace('Hero Feature',''),
                                 image: img,
                                 items: items,
                                 character: {
                                      chara
                                 },
                                 attributes: {
                                      movement_speed: attrib[12].replace('● Movement Speed',''),
                                      physical_attack: attrib[13].replace('● Physical Attack',''),
                                      magic_power: attrib[14].replace('● Magic Power',''),
                                      attack_speed: attrib[15].replace('● Attack Speed',''),
                                      physical_defense: attrib[16].replace('● Physical Defense',''),
                                      magic_defense: attrib[17].replace('● Magic Defense',''),
                                      basic_atk_crit_rate: attrib[18].replace('● Basic ATK Crit Rate',''),
                                      hp: attrib[19].replace('● HP',''),
                                      mana: attrib[20].replace('● Mana',''),
                                      ability_crit_rate: attrib[21].replace('● Ability Crit Rate',''),
                                      hp_regen: attrib[22].replace('● HP Regen',''),
                                      mana_regen: attrib[23].replace('● Mana Regen','')
                                 },
                                 price: {
                                      battle_point: mw[1].split('|')[0].replace(/ /g,''),
                                      diamond: mw[1].split('|')[1].replace(/ /g,''),
                                      hero_fragment: mw[1].split('|')[2] ? mw[1].split('|')[2].replace(/ /g,'') : 'none'
                                 },
                                 role: mw[2],
                                 skill: {
                                      durability: skill[0],
                                      offense: skill[1],
                                      skill_effects: skill[2],
                                      difficulty: skill[3]
                                 },
                                 speciality: mw[3],
                                 laning_recommendation: mw[4],
                                 release_date: mw[5],
                                 background_story: story
                            }
                            resolve(result)
                       }).catch((e) => reject({ status: 404, message: e.message }))
                  }).catch((e) => reject({ status: 404, message: e.message }))
             })
        }
 
function herolist(){
    return new Promise((resolve, reject) => {
            axios.get('https://mobile-legends.fandom.com/wiki/Mobile_Legends:_Bang_Bang_Wiki')
             .then(({ data }) => {
                      const $ = cheerio.load(data)
                      let data_hero = []
                      let url = []
                      $('div > div > span > span > a').get().map((result) => {
                          const name = decodeURIComponent($(result).attr('href').replace('/wiki/',''))
                          const urln = 'https://mobile-legends.fandom.com' + $(result).attr('href')
                          data_hero.push(name)
                          url.push(urln)
                       })
                    resolve({ status: 200, hero: data_hero })
                }).catch((e) => reject({ status: 404, message: e.message }))
           })
      }
      
function akanekoApi(param) {
	return new Promise(async(resolve, reject) => {
		const data = await axios.get('https://akaneko-api.herokuapp.com/api/'+param)
		resolve(data.data.url)
	})
}

async function twitterdl(url) {
	let payload = { url, submit: '' }
	let res = await fetch('https://www.expertsphp.com/instagram-reels-downloader.php', {
		method: 'POST',
		body: new URLSearchParams(Object.entries(payload)),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			cookie: '_ga=GA1.2.783835709.1637038175; __gads=ID=5b4991618655cd86-22e2c7aeadce00ae:T=1637038176:RT=1637038176:S=ALNI_MaCe3McPrVVswzBEqcQlgnVZXtZ1g; _gid=GA1.2.1817576486.1639614645; _gat_gtag_UA_120752274_1=1',
			origin: 'https://www.expertsphp.com',
			referer: 'https://www.expertsphp.com/twitter-video-downloader.html',
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
		}
	})
	let $ = cheerio.load(await res.text())
	let results = []
	$('table.table > tbody > tr').each(function () {
		let quality = $(this).find('td').eq(2).find('strong').text()
		let type = $(this).find('td').eq(1).find('strong').text()
		let url = $(this).find('td').eq(0).find('a[href]').attr('href')
		let isVideo = /video/i.test(type)
		results.push({ quality, type, url, isVideo })
	})
	return results
}

async function snaptik(url) {
	let results = {}
	if (/v[tm]\.tiktok\.com/g.test(url)) {
		let res = await axios.get(url)
		url = res.request.res.responseUrl
	}
	let res = await axios.get(`https://api.snaptik.site/video-key?video_url=${url}`)
	let key = JSON.parse(JSON.stringify(res.data, null, 2))
	if (key.status !== 'success') throw key
	let res2 = await axios.get(`https://api.snaptik.site/video-details-by-key?key=${key.data.key}`)
	let data = JSON.parse(JSON.stringify(res2.data, null, 2))
	if (data.status !== 'success') throw data
	results = {
		author: { ...data.data.author },
		description: data.data.description,
		video: {
			watermark: `https://api.snaptik.site/download?key=${data.data.video.with_watermark}&type=video`,
			no_watermark: `https://api.snaptik.site/download?key=${data.data.video.no_watermark}&type=video`,
			no_watermark_raw: data.data.video.no_watermark_raw
		},
		music: `https://api.snaptik.site/download?key=${data.data.music}&type=music`
	}
    return results
}

function KomikDl(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text().replace('Bahasa Indonesia - MyNimeku', '').trim()
			let result = []
			$('div.reader-area > p > img').each(function () {
				result.push($(this).attr('src'))
			})
			resolve({ title, result })
		}).catch(reject)
	})
}

function AnimeDl(url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text()
			let thumb = $('meta[property="og:image"]').attr('content')
			let url = $('#linklist').find('a').attr('href')
			resolve({ title, thumb, url })
		}).catch(reject)
	})
}

async function telesticker(url) {
    return new Promise(async (resolve, reject) => {
        const packName = url.replace("https://t.me/addstickers/", "")
        const data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {method: "GET",headers: {"User-Agent": "GoogleBot"}})
        const hasil = []
        for (let i = 0; i < data.data.result.stickers.length; i++) {
            fileId = data.data.result.stickers[i].thumb.file_id
            data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
            result = {
               status: 200,
               url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
            }
            hasil.push(result)
        }
       resolve(hasil)
    })
}

function ttdownloader(url){
	return new Promise(async(resolve, reject) => {
		axios.get('https://ttdownloader.com/',{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			let token = $('#token').attr('value')
			let config = {
				'url': url,
				'format': '',
				'token': token
			}
		axios('https://ttdownloader.com/req/',{
			method: 'POST',
			data : new URLSearchParams(Object.entries(config)),
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=9ut8phujrprrmll6oc3bist01t; popCookie=1; _ga=GA1.2.1068750365.1625213061; _gid=GA1.2.842420949.1625213061"
			}
			})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			resolve({
				nowm: $('div:nth-child(2) > div.download > a').attr('href'),
				wm: $('div:nth-child(3) > div.download > a').attr('href'),
				audio: $('div:nth-child(4) > div.download > a').attr('href')
				})
			})
		})
	.catch(reject)
	})
}

function WattpadUser(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.wattpad.com/user/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                $('#app-container > div > header ').each(function(a, b) {
                    $('#profile-about > div > div ').each(function(c, d) {
                    result = {
                    username: $(b).find('> div.badges > h1').text().trim(),
                    works: $(b).find('> div.row.header-metadata > div:nth-child(1) > p:nth-child(1)').text(),
                    reading_list: $(b).find('> div.row.header-metadata > div.col-xs-4.scroll-to-element > p:nth-child(1)').text(),
                    followers: $(b).find('> div.row.header-metadata > div.col-xs-4.on-followers > p.followers-count').text(),
                    joined: $(d).find('> ul > li.date.col-xs-12.col-sm-12 > span').text().trim().replace('Joined',''),
                    pp_picture: `https://img.wattpad.com/useravatar/${query}.128.851744.jpg`,
                    about: $(d).find('> div.description > pre').text() ? $(d).find('> div.description > pre').text() : 'Not found'
                }
                resolve(result)
                })
                })
            })
            .catch(reject)
    })
}

async function whois(domain = 'lolhuman.xyz') {
  return new Promise((resolve, reject) => {
    var options = { 
      method: 'POST',
      url: 'https://www.hostinger.co.id/whois',
      headers: { 
        'content-type': 'application/x-www-form-urlencoded'
      },
      form: { 
        domain: `${domain}`, 
        submit: 'search' 
      }
    };

    request(options, async function (error, response, body) {
      if (error) throw new Error(error);
      const result = JSON.parse(body);
      resolve({
        result: result["domain"]
      });
    });
  });
}

function domainSearch(query) {
	return new Promise((res, rej) => {
		axios(`https://www.domainesia.com/domain/?domain=${query}`).then(c => {
			let $ = cheerio.load(c.data)
			let result = []
			$('div.results_domain').get().map(v => {
				let domain = $(v).attr('id')
				let price = $(v).text().trim().split(' ')[0]
				if (domain !== undefined && price !== '') result.push({ domain: domain.replace('result_', query + '.'), price })
			})
			res(result)
		}).catch(rej)
	})
}

async function nhentai(id) {
	let uri = id ? `https://cin.guru/v/${+id}/` : 'https://cin.guru/'
	let html = (await axios.get(uri)).data
	let data = JSON.parse(html.split('<script id="__NEXT_DATA__" type="application/json">')[1].split('</script>')[0]).props.pageProps.data
	let thumb = `https://external-content.duckduckgo.com/iu/?u=https://t.nhentai.net/galleries/${data.media_id}/thumb.jpg`	
	let pages = []
		data.images.pages.map((v, i) => {
		let ext = new URL(v.t).pathname.split('.')[1]
		pages.push(`https://external-content.duckduckgo.com/iu/?u=https://i7.nhentai.net/galleries/${data.media_id}/${i + 1}.${ext}`)
	})
	return {
		id: data.id,
		title: data.title,
		thumbnail: thumb,
		list_image: pages,
		media_id: data.media_id,
		upload_date: data.upload_date,
		tags: data.tags,
		num_pages: data.num_pages,
		num_favirotes: data.num_favorites,
		upload_time: data.upload_time,
		hits: data.hits,
		lang: data.lang
	 }
	}

	async function nhentaiv2(id) {
		let anu = await axios.get(`https://nhentai.to/g/${id}`)
		let $ = cheerio.load(anu.data)
		let titleID = $("div#info > h1").text().trim()
		let titleJP = $("div#info > h2").text().trim()
		let list_image = $('#thumbnail-container > div.thumb-container > a > img').get().map(v => 'https://external-content.duckduckgo.com/iu/?u=https://i7.nhentai.net/' + $(v).attr('data-src').replace(/t(\.jpg|\.jpeg|\.png|\.webp|\.gif)$/, "$1").replace('https://cdn.dogehls.xyz/', ''))
		let thumbnail = list_image[0]
		let metadata = {};
			try {
				const _elementRhapsody = $("div#info > section#tags");
				$(_elementRhapsody)
					.find(".tag-container.field-name")
					.each((_i, _e) => {
					const tags = [];
					const _key = $(_e).text().trim().split(/\n/)[0].toLowerCase();
					$(_e)
						.find(".tag")
						.each((i, e) => {
						const _tag = $(e).find(".name") || $(e).find("time")
						tags.push(_tag.text());
					});
					metadata[_key.replace(/\:.*/g, "")] = tags.join(", ");
				});
			}
			catch (e) {
				metadata["error"] = String(e);
			}	
		return {
			  id,
		  titleID,
		  titleJP,
		  thumbnail,
		  metadata,
		  list_image
		}
	}

	async function nhentaisearch(query) {
		return new Promise((resolve, reject) => {
		axios.get(`https://nhentai.to/search?q=${query}`)
			.then(({
			   data
			}) => {
				const $ = cheerio.load(data)
				const hasil = [];
				$('body > div.container.index-container > div').each(function(a, b) {
				const result = {                     
				link: 'https://nhentai.net' + $(b).find('> a').attr('href'),
				code: $(b).find('> a').attr('href').replace(/\D/g, ''),
				thumb: $(b).find('> a > img:nth-child(2)').attr('src'),
				title: $(b).find('> a > div').text()
							}
				hasil.push(result)
				})
				resolve(hasil)
			 })
			 .catch(reject)
		   })
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

function NekogetLatest(type, page = 1) {
	return new Promise((resolve, reject) => {
		const baseURL = 'https://nekopoi.care'
		if (/hentai/i.test(type)) {
			axios.get(`${baseURL}/category/hentai/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let desc = $(e).find('p:nth-child(2)').text().trim() || $(e).find('h2:nth-child(1)').text().trim()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, desc, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/3dhentai/i.test(type)) {
			axios.get(`${baseURL}/category/3d-hentai/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/jav/i.test(type)) {
			axios.get(`${baseURL}/category/jav/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/javcosplay/i.test(type)) {
			axios.get(`${baseURL}/category/jav-cosplay/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else {
			axios.get(`${baseURL}/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.eropost').each(function(i, e) {
					let title = $(e).find('h2').text().trim()
					let release_date = $(e).find('span:nth-child(2)').text().trim()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, release_date, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		}
	})
}

async function Getlatest() {
	let html = (await axios.get('https://doujindesu.tv/')).data
	let $ = cheerio.load(html)
	let arr = []
			$('div.entries > article.entry').each((idx, el) => arr.push({
				title: $(el).find('a').attr('title'),
				chapter: $(el).find('div.artists > a').attr('title').split(' Chapter ')[1],
				type: $(el).find('span.type').text(),
				cover: $(el).find('img').attr('src'),
				url: 'https://doujindesu.tv' + $(el).find('a').attr('href')
			}))
			return arr
	}
	async function Getsearch(query) {
	let html = (await axios.get(`https://doujindesu.tv/?s=${query}`)).data
	let $ = cheerio.load(html) 
	let arr = []
			$('div.entries > article.entry').each((idx, el) => arr.push({
				title: $(el).find('a').attr('title'),
				type: $(el).find('span.type').text(),
				status: $(el).find('div.status').text(),
				score: $(el).find('div.score').text().trim(),
				cover: $(el).find('img').attr('src'),
				url: 'https://doujindesu.tv' + $(el).find('a').attr('href')
			}))
			return arr
	}
	async function Getdetail(url) {
	let html = (await axios.get(url)).data
	let $ = cheerio.load(html)
	let obj = {}
			//let pages = []
			obj.title = $('div.wrapper').find('img').attr('title')
			obj.cover = $('div.wrapper').find('img').attr('src')
			obj.synonyms = $('div.wrapper').find('span.alter').text()
			$('div.wrapper').find('table > tbody > tr').each((idx, el) => {
				let str = $(el).find('td').eq(0).text().replace(/ /g, '_').toLowerCase()
				obj[str] = $(el).find('td > a').text() || $(el).find('div.rating-prc').text() || $(el).find('td').eq(1).text()
			})
			obj.genre = $('div.tags > a').get().map((v) => $(v).attr('title')).join(', ')
			obj.synopsis = $('div.pb-2 > p').get().map((v) => $(v).text()).filter(v => !/Download Batch/.test(v)).join('\n\n').replace('Sinopsis:', '').trim()
			obj.chapter_list = []
			$('#chapter_list > ul > li').each((idx, el) => obj.chapter_list.push({
				title: $(el).find('div.epsleft > span > a').text(),
				date: $(el).find('div.epsleft > span.date').text(),
				url: 'https://doujindesu.tv' + $(el).find('a').attr('href')
			}))
			return obj
	}
	async function Getdownload(url) { 
	let html = (await axios.get(url)).data
	let $ = cheerio.load(html)
	let dataID = $("main#reader").attr("data-id")
			let res = await axios.post("https://doujindesu.tv/themes/ajax/ch.php", `id=${dataID}`, { headers: { "referer": "https://doujindesu.tv", "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.81 Safari/537.36" }})         
			let $$ = cheerio.load(res.data)
			let anus = $$('img').get().map(v => $(v).attr('src'))
			let arr = []
				for (let i of anus) {
					let rest = await axios.get(i, { headers: { "content-Type": "application/x-www-form-urlencoded", "referer": i, "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36" }, responseType: "arraybuffer" })
					let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(rest.headers['content-type'])
					let buffer = await (isTele ? uploadImage : webp2png)(rest.data)
					arr.push(buffer)
					}
			return {
				id: dataID,
				title: $('h1').text(),		
				url: $('div.chright > span > a').attr('href'),
				pages: arr
			}
	} 

	async function tiktokstalk(username) {
		const detailVideo = async (url) => {
				let html = (await axios.get(url)).data
				let $ = cheerio.load(html), obj = { author: {}, video: {} }
				let video = $('div.video > div:nth-child(2)').find('div.row')
				let info = $('div.info > span').get().map(x => $(x).text())
				obj.author.username = video.text().match(/@(.*)/)?.[0]
				obj.author.followers = video.text().match(/(.*) followers/)?.[1]
				obj.author.avatar = video.find('img').attr('src')
				obj.video.post = video.text().match(/Posted (.*)/)?.[1]
				obj.video.play = info?.[0]
				obj.video.likes = info?.[1]
				obj.video.comments = info?.[2]
				obj.video.share = info?.[3]
				obj.video.music = $('div.music').text().trim()
				obj.video.description = $('div.info2').text().trim()
				obj.video.url = $('video').attr('src')
				obj.video.url2 = `https://tiktok.com/${obj.author.username}/video/${url.split('-').slice(-1)}`
				return obj
		}
				let html = (await axios.get(`https://urlebird.com/user/${username}/`)).data
				let $ = cheerio.load(html), obj = {}
				let img = $('img.user-image')
				let stats = $('div.content').find('div.row > div').get().map(x => $(x).text())
				let thumbs = $('div.thumb').get().map(x => encodeURI($(x).find('a').eq(2).attr('href')))
				obj.name = img.attr('alt').split(' - ')?.[1]
				obj.username = img.attr('alt').split(' - ')?.[0]
				obj.likes = stats?.[0]
				obj.followers = stats?.[1]?.replace(' followers', '')
				obj.following = stats?.[2]?.replace(' following', '')
				obj.description = $('div.content > p').text()
				obj.avatar = img.attr('src')
				obj.videos = []
				for (let x of thumbs) obj.videos.push(await detailVideo(x))
				return obj
		}

		async function githubrepo(repo) {
			return new Promise(async (resolve, reject) => {
				await axios
					.get(`https://api.github.com/search/repositories?q=${repo}`)
					.then((response) => {
					//    if (response.status == 200) {
							const results = response.data.items;
		
							data = {};
							data.code = response.status;
							data.message = "ok";
							data.totalCount = response.data.total_count;
							data.items = [];
		
						  //  if (data.totalCount != 0) {
								results.forEach((res) => {
									data.items.push({
										id: res.id,
										nodeId: res.node_id,
										nameRepo: res.name,
										fullNameRepo: res.full_name,
										url_repo: res.html_url,
										description: res.description,
										git_url: res.git_url,
										ssh_url: res.ssh_url,
										clone_url: res.clone_url,
										svn_url: res.svn_url,
										homepage: res.homepage,
										stargazers: res.stargazers_count,
										watchers: res.watchers,
										forks: res.forks,
										defaultBranch: res.default_branch,
										language: res.language,
										isPrivate: res.private,
										isFork: res.fork,
										createdAt: res.created_at,
										updatedAt: res.updated_at,
										pushedAt: res.pushed_at,
										author: {
											username: res.owner.login,
											id_user: res.owner.id,
											avatar_url: res.owner.avatar_url,
											user_github_url: res.owner.html_url,
											type: res.owner.type,
											isSiteAdmin: res.owner.site_admin,
										},
									});
								});
						 //   } else {
						 //       data.items = "Repositories not found";
						 //  }
		
							resolve(data);
					 //  } else {
					 //      reject({
					 //          code: 500,
					 //          success: false,
					 //          message: "Server Bermasalah",
					 //     });
					 //  }
					})
					.catch((err) => {
						reject(err);
					});
			});
		};

		function twitterstalk(user) {
			return new Promise((resolve, reject) => {
				axios.get('https://instalker.org/'+user)
				.then(({ data }) => {
					let $ = cheerio.load(data)
					let tweets = []
					$('div.activity-posts').each(function (a, b) {
						tweets.push({
							author: {
								username: $(b).find('div.user-text3 > h4 > span').text(),
								nickname: $(b).find('div.user-text3 > h4').text().split('@')[0] || $(b).find('div.user-text3 > h4').text().trim(),
								profile_pic: $(b).find('img').attr('src') || $(b).find('img').attr('onerror'),
								upload_at: $(b).find('div.user-text3 > span').text()
							},
							title: $(b).find('div.activity-descp > p').text() || '',
							media: $(b).find('div.activity-descp > div > a').attr('href') || $(b).find('div.activity-descp > p > video').attr('src') || $(b).find('div.activity-descp > div > a > img').attr('src') || $(b).find('div.activity-descp > div > a > video').attr('src') || 'No Media Upload',
							retweet: $(b).find('div.like-comment-view > div > a:nth-child(1) > span').text().replace('Download Image', ''),
							likes: $(b).find('div.like-comment-view > div > a:nth-child(2) > span').text()
						})
					})
					let hasil = {
						username: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3 > span').text(),
						nickname: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3').text().split('@')[0] || $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > h3').text(),
						background: $('body > main > div.dash-todo-thumbnail-area1 > div.todo-thumb1.dash-bg-image1.dash-bg-overlay').attr('style').split('url(')[1].split(')')[0],
						profile: $('body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a > img').attr('src') || $('body > main > div.dash-todo-thumbnail-area1 > div.dash-todo-header1 > div > div > div > div > div > a').attr('href'),
						desc_text: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(2)').text() || '',
						join_at: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(3)').text() || $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(5)').text(),
						map: $('body > main > div.dash-dts > div > div > div:nth-child(1) > div > div > span:nth-child(4)').text() || '',
						tweets_count: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(1) > div > div.dscun-numbr').text(),
						followers: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(2) > div > div.dscun-numbr').text(),
						following: $('body > main > div.dash-dts > div > div > div:nth-child(2) > ul > li:nth-child(3) > div > div.dscun-numbr').text(),
						media_count: tweets.length,
						media: tweets || 'No Media Upload'
					}
					resolve(hasil)
				})
			})
		}
		
		async function openai(type = 'chat', text) {
			const configuration = new Configuration({
			  apiKey: "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",
			});
			const openai = new OpenAIApi(configuration);
			if (/^chat$/i.test(type)) {
			let response = await openai.createCompletion({
			  model: "text-davinci-003",
			  prompt: text,
			  temperature: 0.7,
			  max_tokens: 256,
			  top_p: 1,
			  frequency_penalty: 0,
			  presence_penalty: 0,
			});
			return response.data.choices[0].text
			} else if (/^image$/i.test(type)) {
			let response = await openai.createImage({
			  prompt: text,
			  n: 2,
			  size: "1024x1024",
			});
			return response.data.data
			} else {
					throw 'Type not supported'
				}
			}

			async function igDownloader(Link) {
				const hasil = []
				const Form = {
					url: Link,
					submit: ""
				}
				await axios(`https://downloadgram.org/`, {
					method: "POST",
					data:  new URLSearchParams(Object.entries(Form)),
					headers: {
						"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
						"accept-language": "en-US,en;q=0.9,id;q=0.8",
						"cache-control": "max-age=0",
						"content-type": "application/x-www-form-urlencoded",
						"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
						"cookie": "_ga=GA1.2.1695343126.1621491858; _gid=GA1.2.28178724.1621491859; __gads=ID=8f9d3ef930e9a07b-2258e672bec80081:T=1621491859:RT=1621491859:S=ALNI_MbqLxhztDiYZttJFX2SkvYei6uGOw; __atuvc=3%7C20; __atuvs=60a6eb107a17dd75000; __atssc=google%3B2; _gat_gtag_UA_142480840_1=1"
					},
					referrerPolicy: "strict-origin-when-cross-origin",
				}).then(async res => {
					const $ = cheerio.load(res.data)
					let url = $('#downloadBox').find('a').attr('href');
					await axios(Link, {
						method: "GET",
						data: null,
						headers: {
							"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
							"accept-language": "en-US,en;q=0.9,id;q=0.8",
							"cache-control": "max-age=0",
							"sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
							"cookie": "ig_did=08A3C465-7D43-4D8A-806A-88F98384E63B; ig_nrcb=1; mid=X_ipMwALAAFgQ7AftbrkhIDIdXJ8; fbm_124024574287414=base_domain=.instagram.com; shbid=17905; ds_user_id=14221286336; csrftoken=fXHAj5U3mcJihQEyVXfyCzcg46lHx7QD; sessionid=14221286336%3A5n4czHpQ0GRzlq%3A28; shbts=1621491639.7673564; rur=FTW"
						},
						referrerPolicy: "strict-origin-when-cross-origin"
					}).then(respon => {
						const ch = cheerio.load(respon.data)
						let title = ch('title').text().trim()
						const result = {
							status: true,
							result: {
								link: url,
								desc: title
							}
						}
						hasil.push(result)
					})
				})
				return hasil[0]
			}
			
module.exports.pinterest = pinterest
module.exports.pinterestdl = pinterestdl
module.exports.mediafireDl = mediafireDl
module.exports.igDownload = igDownload
module.exports.igStory = igStory
module.exports.scdl = scdl
module.exports.anonfiledl = anonfiledl
module.exports.sfiledl = sfiledl
module.exports.sfilesearch = sfilesearch
module.exports.stickerDl = stickerDl
module.exports.pixivDl = pixivDl
module.exports.xnxxDl = xnxxDl
module.exports.musicaldown = musicaldown
module.exports.zippyshare = zippyshare
module.exports.getLatestKomik = getLatestKomik
module.exports.getLatestAnime = getLatestAnime
module.exports.kusoNime = kusoNime
module.exports.nhentai = nhentai
module.exports.nhentaiv2 = nhentaiv2
module.exports.nhentaisearch = nhentaisearch
module.exports.doujindesuSearch = doujindesuSearch
module.exports.doujindesuDl = doujindesuDl
module.exports.doujindesuLatest = doujindesuLatest
module.exports.mynimeSearch = mynimeSearch
module.exports.getInfoAnime = getInfoAnime
module.exports.getLatestHanime = getLatestHanime
module.exports.artinama = artinama
module.exports.artimimpi = artimimpi
module.exports.ramalanJodoh = ramalanJodoh
module.exports.konachan = konachan
module.exports.happymodSearch = happymodSearch
module.exports.searchIlust = searchIlust
module.exports.stickerSearch = stickerSearch
module.exports.xnxxSearch = xnxxSearch
module.exports.alphacoders = alphacoders
module.exports.wallpapercave = wallpapercave
module.exports.tebakgambar = tebakgambar
module.exports.ghstalk =  ghstalk
module.exports.herodetails = herodetails
module.exports.herolist = herolist
module.exports.akanekoApi = akanekoApi
module.exports.twitterdl = twitterdl
module.exports.snaptik = snaptik
module.exports.KomikDl = KomikDl
module.exports.AnimeDl = AnimeDl
module.exports.telesticker = telesticker
module.exports.WattpadUser = WattpadUser
module.exports.whois = whois
module.exports.domainSearch = domainSearch
module.exports.ttdownloader = ttdownloader
module.exports.toPDF = toPDF
module.exports.NekogetLatest = NekogetLatest
module.exports.Getlatest =  Getlatest
module.exports.Getsearch = Getsearch
module.exports.Getdetail = Getdetail
module.exports.Getdownload = Getdownload
module.exports.tiktokstalk = tiktokstalk
module.exports.githubrepo = githubrepo
module.exports.twitterstalk = twitterstalk
module.exports.openai = openai
module.exports.igDownloader = igDownloader