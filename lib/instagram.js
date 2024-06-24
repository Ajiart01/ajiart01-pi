const axios = require('axios');
const cheerio = require('cheerio');

async function instagramdl(url) {
const { data, headers } = await axios.request({
				url: "https://downloadgram.org",
				method: "POST",
				headers: {
					"content-Type": "application/x-www-form-urlencoded",
					"upgrade-Insecure-Requests": "1",
					"referer": "https://downloadgram.org",
					"referrer-Policy": "strict-origin-when-cross-origin",
				},
				data: new URLSearchParams({ url, submit: "" }),
			}).catch((e) => e.response);
			const $ = cheerio.load(data);
			const _temp = [];
			$("#downloadhere > a[download='']").each((i, e) => {
				_temp.push({ url: $(e).attr("href") });
			});
			if (Array.isArray(_temp) && _temp.length) {
				return _temp;
			} else {
				throw new Error(
					$(".alert-danger").text() || "v1: Failed to retrieve data."
				);
	 }
}
async function instagramdlv2(url) {
    return new Promise(async (resolve, reject) => {
        const BASE_URL = "https://instasupersave.com/"

        //New Session = Cookies
        try {
            const resp = await axios(BASE_URL);
            const cookie = resp.headers["set-cookie"]; // get cookie from request
            const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=", "").replace("%3D", "")
            const data = await axios.get(url);
            const $ = cheerio.load(data.data);

            //REQUEST CONFIG
            var config = {
                method: 'post',
                url: `${BASE_URL}api/convert`,
                headers: {
                    'origin': 'https://instasupersave.com',
                    'referer': 'https://instasupersave.com/pt/',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
                    'x-xsrf-token': session,
                    'Content-Type': 'application/json',
                    'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
                },
                data: {
                    url: url
                }
            };

            //REQUEST
            axios(config).then(function (response) {
                let ig = []
                if (Array.isArray(response.data)) {
                    response.data.forEach((post) => { ig.push(post.sd === undefined ? post.thumb : post.sd.url) })
                } else {
                    ig.push(response.data.url[0].url)
                }

                resolve({
                    results_number: ig.length,
                    name: $("meta[property='og:title']").attr("content"),
                    url_list: ig
                })
            })
                .catch(function (error) {
                    reject(error.message)
                })
        } catch (e) {
            reject(e.message)
        }
    })
}

async function igdl(url){
	return new Promise(async(resolve, reject) => {
		axios.request({
			url: 'https://www.instagramsave.com/download-instagram-videos.php',
			method: 'GET',
			headers:{
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
			}
		})
		.then(({ data }) => {
			const $ = cheerio.load(data)
			const token = $('#token').attr('value')
			let config ={
				headers: {
					'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
					"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
					"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				},
				data: {
					'url': url,
					'action': 'post',
					'token': token
				}
			}
		axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
		.then(({ data }) => {
		resolve(data.medias)
		   })
		})
	.catch(reject)
	})
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

module.exports = { instagramdl, instagramdlv2, igdl, igDownloader }