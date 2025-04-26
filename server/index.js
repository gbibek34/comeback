require('dotenv').config();
const express = require('express')
const connect = require('./config/database')
const categoryUrl = require('./routes/categoryRoutes')
const productUrl = require('./routes/productRoutes')
const userUrl = require("./routes/userRoutes")
const addressUrl = require("./routes/addressRoutes")
const cartUrl = require("./routes/cartRoutes")
const orderUrl = require("./routes/orderRoutes")

//Connecting the database
connect(process.env.MONGO_URI)

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())

app.use('/api/category/', categoryUrl)
app.use('/api/product/', productUrl)
app.use('/api/user/', userUrl)
app.use('/api/address/', addressUrl)
app.use('/api/cart/', cartUrl)
app.use('/api/order/', orderUrl)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get(/(.*)/, (req, res) => {
    res.send("Path not found!")
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
