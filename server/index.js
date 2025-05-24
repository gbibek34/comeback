require('dotenv').config();
const express = require('express')
const cors = require('cors')
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
app.use(cors())
// Custom CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/api/category/', categoryUrl)
app.use('/api/product/', productUrl)
app.use('/api/user/', userUrl)
app.use('/api/address/', addressUrl)
app.use('/api/cart/', cartUrl)
app.use('/api/order/', orderUrl)

app.get(/(.*)/, (req, res) => {
    res.send("Path not found!")
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
