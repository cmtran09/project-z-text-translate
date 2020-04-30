const axios = require("axios")

function translateAndText(req, res) {

	const key = "trnsl.1.1.20200430T193714Z.38528beeb497af85.ccc8582dffab7fb59f5232f80c022fe83f128e44"
	const text = req.body.message
	const lang = req.body.language
	const recipientNumber = req.body.number

	const twilioNumber = "+13163134784"
	const accountSid = "AC7ca5ae686cef0503c846ba87009871ae"
	const authToken = "cd018fe2561d1653477db763def27dbf"

	const client = require("twilio")(accountSid, authToken)

	axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=en-${lang}`)
		.then(translatedText => {
			console.log("translatedText.data : ", translatedText.data)
			client.lookups.phoneNumbers(number)
				.fetch({ countryCode: "GB" })
				.then(phone_number => console.log(phone_number.phoneNumber))
				.catch(err => res.status(400).json({ message: err }))

			client.messages
				.create({
					body: translatedText.data.text[0],
					from: twilioNumber,
					to: `${recipientNumber}`
				})
				.then(message => {
					console.log(message.sid)
					if (message.sid) return res.status(200).json({ message: "Translated message sent!" })
				})
		})
		.catch(err => res.status(502).json({ message: err }))
}

module.exports = {
	translateAndText
}