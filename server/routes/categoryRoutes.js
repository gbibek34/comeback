const express = require('express')
const { allCategories, addCategory, updateCategory, deleteCategory } = require("../controllers/categoryController")

const router = express.Router()

router.get("/", allCategories)

router.post("/add", addCategory)

router.patch("/update/:id", updateCategory)

router.delete("/delete/:id", deleteCategory)

module.exports = router