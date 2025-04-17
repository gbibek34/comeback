const Product = require("../models/product.models")

const addProduct = async (req, res) => {
    try {

        const { title, description, category, stock, price, image } = req.body

        if (!title | !description | !category | !stock | !price) {
            res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
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

        res.status(201).json({
            success: true,
            message: "Product Created!",
            data: product
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Unexpected Error!",
            error: error.stack
        })
    }


}

module.exports = { addProduct }