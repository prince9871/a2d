const express = require('express')
const mongoose = require('mongoose')
const route = require('./route/route')

const app = express()
app.use(express.json()) 
const port = 3000
mongoose.connect('mongodb+srv://prince9871:BZjeaWxY1uTLCefz@cluster0.pelsn1m.mongodb.net/a2dDatabase', {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB Running"))
    .catch(err => console.log(err))

app.use('/', route)

app.use('/*', function (req, res) {
    return res.status(400).send({ status: false, msg: 'You Are In Wrong Path' })
})

app.listen(port, function () {
    console.log('Express Running on ' + port)
})
