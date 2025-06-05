const express = require('express')
const { registerUser, loginUser, updateProfile, createAdmin, getProfile, deleteProfile } = require("../controllers/userController")
const { isAuth, isAdmin } = require("../utils/authHandler");

const router = express.Router()

router.post("/signup", registerUser)

router.get("/profile", isAuth, getProfile )

router.post("/login", loginUser)

router.put("/update/:id", isAuth, updateProfile)

router.post("/createadmin", isAuth, isAdmin, createAdmin)

router.delete("/delete", isAuth, deleteProfile)

module.exports = router