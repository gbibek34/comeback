const express = require("express")
const { addCart } = require("../controllers/cartController")

const router = express.Router()

router.post("/add", addCart)