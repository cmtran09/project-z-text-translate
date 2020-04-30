const axios = require('axios')

function translateAndText(req, res) {
	
	const key = 'trnsl.1.1.20191202T095947Z.54175132da211fc1.7560318e65d14be6fcc297876ea8f7cb07e89154'
	const text = req.body.message
	const lang = req.body.language

	axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=en-${lang}`)
	.then((res) => console.log(res))
	.catch(err=>console.log(err))
}

module.exports = {
	translateAndText
}