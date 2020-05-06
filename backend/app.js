const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const path = require('path')
const dist = path.join(__dirname, '../dist')

const router = require('./config/router')

app.use(bodyParser.json())

app.use((req, resp, next) => {
    console.log(`${req.method} to ${req.url}`)
    next()
  })

app.use('/api', router)

app.use('/', express.static(dist))

app.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'))
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`))