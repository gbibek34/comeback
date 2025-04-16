const express = require('express')
const connect = require('./config/database')

//Connecting the database
connect()

const PORT = 5000
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get(/(.*)/, (req, res) => {
    res.send("Path not found!")
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
