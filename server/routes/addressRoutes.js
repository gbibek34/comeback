const express = require("express")
const { addAddress, updateAddress, deleteAddress, getAddress } = require("../controllers/addressController")
const { isAuth } = require("../utils/authHandler");

const router = express.Router()

router.get('/all', isAuth, getAddress)

router.post('/add', isAuth, addAddress)

router.put('/update/:id', isAuth, updateAddress)

router.delete('/delete/:id', isAuth, deleteAddress)

module.exports = router