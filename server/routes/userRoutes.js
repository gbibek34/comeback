const express = require('express')
const { registerUser, loginUser, updateProfile, createAdmin, getProfile } = require("../controllers/userController")
const { isAuth, isAdmin } = require("../utils/authHandler");

const router = express.Router()

router.post("/signup", registerUser)

router.get("/profile", isAuth, getProfile )

router.post("/login", loginUser)

router.put("/update/:id", isAuth, updateProfile)

router.post("/createadmin", isAuth, isAdmin, createAdmin)

module.exports = router