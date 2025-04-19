const Product = require("../models/product.models")
const { successRes, customRes, errorRes } = require("../utils/responseHandler")

const allProducts = async (req, res) => {
    try {
        const products = await Category.find({})

        if (!products || products.length === 0) {
            return customRes(res, false, "No products found", 404)
        }

        return successRes(res, "All Products", products)
    } catch (error) {
        return errorRes(res, error)
    }
}

const addProduct = async (req, res) => {
    try {
        const { title, description, category, stock, price, image } = req.body

        if (!title || !description || !category || !stock || !price) {
            return customRes(res, false, "All fields are required!", 400)
        }

        const product = new Product({
            title,
            description,
            category,
            stock,
            price,
            image
        })

        await product.save()

        return successRes(res, "Product Created!", product)
    } catch (error) {
        return errorRes(res, error)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id: prodId } = req.params
        const { title, description, category, stock, price, image } = req.body

        if (!title || !description || !category || !stock || !price) {
            return customRes(res, false, "All fields are required!", 400)
        }

        const uProduct = await Product.findByIdAndUpdate(
            prodId,
            { title, description, category, stock, price, image },
            { new: true }
        )

        if (!uProduct) {
            return customRes(res, false, "Product not found!", 404)
        }

        return successRes(res, "Product updated successfully", uProduct)
    } catch (error) {
        return errorRes(res, error)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id: prodId } = req.params

        const product = await Product.findByIdAndDelete(prodId)

        if (!product) {
            return customRes(res, false, "Product not found!", 404)
        }

        return successRes(res, "Product deleted successfully", product)
    } catch (error) {
        return errorRes(res, error)
    }
}

module.exports = { addProduct, updateProduct, deleteProduct }
