const Category = require("../models/category.models")

const addCategory = async (req, res) => {
    try {
        // Recieve the requests
        const { title } = req.body

        // Validate empty fields
        if (!title) {
            res.status(400).json({
                success: false,
                message: "Enter a title category"
            })
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ title });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: `${existingCategory} already exists!`
            });
        }

        // Create a new category
        const category = new Category({ title })

        // Save category
        await category.save();

        res.status(201).json({
            success: true,
            message: "Category Created!",
            data: category
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

module.exports = { addCategory }