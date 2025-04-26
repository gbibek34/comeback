const express = require('express')
const { addProduct, updateProduct, deleteProduct, allProducts } = require("../controllers/productController")

const router = express.Router()

router.post("/add", addProduct)

router.put("/update/:id", updateProduct)

router.delete("/delete/:id", deleteProduct)

router.get("/all", allProducts)

module.exports = router