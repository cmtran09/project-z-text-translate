const axios = require('axios')
const moment = require('moment');

function translateAndText(req, res) {

  const language = req.body.language
  const number = req.body.number
  const text = req.body.message

  //Yandex
  const key = 'trnsl.1.1.20191202T095947Z.54175132da211fc1.7560318e65d14be6fcc297876ea8f7cb07e89154'

  //Twilio
	const twilioNum = "+13163134784"
	const accountSid = "AC7ca5ae686cef0503c846ba87009871ae"
	const authToken = "cd018fe2561d1653477db763def27dbf"

  const client = require('twilio')(accountSid, authToken)

  //get translation from yandex
	axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=en-${language}`)
    .then(translatedMessage => {
      //ask twilio to check number 
      console.log(translatedMessage)
      client.lookups.phoneNumbers( number )
        .fetch({ countryCode: 'GB' })
        .then(phone_number => console.log(phone_number.phoneNumber))
        .catch(err => res.status(400).json({ message: err }))

      //ask Twilio to send sms
      client.messages
        .create({
          body: translatedMessage.data.text[0],
          from: twilioNum,
          to: `${number}`
        })
        .then((message) => {
          console.log(message.sid)
          if (message.sid) return res.status(200).json({ 
						message_status: 'Success Translated message sent!', 
						sent_message: message.body,
						time_sent: moment().format('MMMM Do YYYY, h:mm:ss a'),
					})
        })
    })
    .catch(err => console.log(err))
}

module.exports = {
  translateAndText
}