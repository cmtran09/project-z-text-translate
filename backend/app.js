const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const router = require('./config/router')

app.use(router)

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`))