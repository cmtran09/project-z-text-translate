const router = require('express').Router()

router.get('/', (req, res) => res.json({ message: 'HOMEPAGE' }))
router.get('/about', (req, res) => res.json({ message: 'ABOUT' }))
router.get('/books', (req, res) => res.json({ message: 'BOOKs' }))

module.exports = router