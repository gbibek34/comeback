const express = require('express')
const { registerUser, loginUser } = require("../controllers/userController")

const router = express.Router()

router.post("/signup", registerUser)

module.exports = router