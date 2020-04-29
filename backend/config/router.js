const router = require('express').Router()
const createSMS = require('../controllers/text_translate')

router.get('/', (req, res) => res.json({ message: 'HOMEPAGE' }))

router.get('/books', (req, res) => res.json({ message: 'BOOKs' }))

router.route('/text')
    .post(createSMS.translateAndText)


module.exports = router