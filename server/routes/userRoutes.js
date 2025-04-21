const express = require('express')
const { registerUser, loginUser, updateProfile, createAdmin } = require("../controllers/userController")
const {isAuth} = require(isAuth);
const{isAdmin} = require(isAdmin);

const router = express.Router()

router.post("/signup", registerUser)

router.post("/login", loginUser)

router.put("/:id", isAuth, updateProfile)

router.post("/createadmin", isAuth, isAdmin, createAdmin )


module.exports = router