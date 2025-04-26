const express = require("express")
const { addtoCart, getCart } = require("../controllers/cartController")
const { isAuth } = require("../utils/authHandler")

const router = express.Router()

router.post("/add/:id", isAuth, addtoCart)

router.get("/current", isAuth, getCart)

module.exports = router