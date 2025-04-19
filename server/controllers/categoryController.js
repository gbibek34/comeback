const Category = require("../models/category.models")
const { successRes, customRes, errorRes } = require("../utils/responseHandler")

// Get all categories
const allCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        if (!categories || categories.length === 0) {
            return customRes(res, false, "No categories found", 404)
        }

        return successRes(res, "All Categories", categories)
    } catch (error) {
        return errorRes(res, error)
    }
}

// Add Ctegory
const addCategory = async (req, res) => {
    try {
        // Recieve the requests
        const { title } = req.body

        // Validate empty fields
        if (!title) {
            return customRes(res, false, "Enter a title for the category", 400)
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ title })
        if (existingCategory) {
            return customRes(res, false, `${existingCategory.title} category already exists!`, 400)
        }

        // Create a new category
        const category = new Category({ title })

        // Save category
        await category.save()

        return customRes(res, true, "Category Created!", 201, category)
    } catch (error) {
        return errorRes(res, error)
    }
}

// Update Category
const updateCategory = async (req, res) => {
    try {
        const { id: catId } = req.params
        const { newTitle } = req.body

        if (!newTitle) {
            return customRes(res, false, "New title is required!", 400)
        }

        const uCategory = await Category.findByIdAndUpdate(
            catId,
            { title: newTitle },
            { new: true }
        )

        if (!uCategory) {
            return customRes(res, false, "Category not found!", 404)
        }

        return successRes(res, "Category updated successfully", uCategory)
    } catch (error) {
        return errorRes(res, error)
    }
}

//Delete Category
const deleteCategory = async (req, res) => {
    try {
        const { id: catId } = req.params

        const category = await Category.findByIdAndDelete(catId)

        if (!category) {
            return customRes(res, false, "Category not found!", 404)
        }

        return successRes(res, "Category deleted successfully", category)
    } catch (error) {
        return errorRes(res, error)
    }
}

module.exports = { allCategories, addCategory, updateCategory, deleteCategory }
