const express = require("express")
const { newOrder } = require("../controllers/orderController")
const { isAuth } = require("../utils/authHandler")

const router = express.Router()

router.post("/new", isAuth, newOrder)

module.exports = router