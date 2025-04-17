require('dotenv').config();
const express = require('express')
const connect = require('./config/database')
const authUrl = require('./routes/authRoutes')
const categoryUrl = require('./routes/categoryRoutes')
const productUrl = require('./routes/productRoutes')

//Connecting the database
connect(process.env.MONGO_URI)

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use('/api/auth/', authUrl)
app.use('/api/category/', categoryUrl)
app.use('/api/product/', productUrl)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get(/(.*)/, (req, res) => {
    res.send("Path not found!")
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
