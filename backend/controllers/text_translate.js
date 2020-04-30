const axios = require("axios")

function translateAndText(req, res) {

	const key = "trnsl.1.1.20191202T095947Z.54175132da211fc1.7560318e65d14be6fcc297876ea8f7cb07e89154"
	const text = req.body.message
	const lang = req.body.language

	const client = require("twilio")(accountSid, authToken)
	const twilioNumber = "+13163134784"
	const accountSid = "AC7ca5ae686cef0503c846ba87009871ae"
	const authToken = "cd018fe2561d1653477db763def27dbf"

	axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=en-${lang}`)
		.then((res) => {
			console.log(res)
			client.lookups.phoneNumbers(number)
				.fetch({ countryCode: "GB" })
				.then(phone_number => console.log(phone_number.phoneNumber))
				.catch(err => res.status(400).json({ message: err }))
		})
		.catch(err => {
			console.log(err.response.data)
			err => res.status(502).json({ message: err })
		})
}

module.exports = {
	translateAndText
}