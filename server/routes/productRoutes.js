const express = require('express')
const { addProduct, updateProduct, deleteProduct } = require("../controllers/productController")

const router = express.Router()

router.post("/add", addProduct)

router.put("/update/:id", updateProduct)

router.delete("/delete/:id", deleteProduct)

module.exports = router