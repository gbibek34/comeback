const express = require("express")
const { addAddress } = require("../controllers/addressController")
const { isAuth } = require("../utils/authHandler");

const router = express.Router()

router.post('/add', isAuth, addAddress)

module.exports = router