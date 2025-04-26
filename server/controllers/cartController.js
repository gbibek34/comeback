const Cart = require("../models/cart.model")
const { successRes, customRes, errorRes } = require("../utils/responseHandler")

const addtoCart = async (req, res) => {
    try {
        const { id: productId } = req.params
        const { quantity } = req.body
        const userId = req.user._id

        if (!productId || !quantity) {
            return customRes(res, false, "All fields are required!", 400)
        }

        const existingCart = await Cart.findOneAndUpdate(
            { user: userId, "items.product": productId },
            { $inc: { "items.$.quantity": quantity } },
            { new: true }
        )
        if (existingCart) {
            return successRes(res, "Product quantity added in Cart!", existingCart)
        } else {
            const cart = await Cart.findOneAndUpdate(
                { user: userId },
                { $push: { items: { product: productId, quantity } } },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )

            return successRes(res, "Product added to Cart!", cart)
        }
    } catch (error) {
        errorRes(res, error)
    }
}

const getCart = async (req, res) => {
    try {
        const userId = req.user._id

        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            customRes(res, false, "Cart not found!", 400)
        }

        successRes(res, "Current Cart!", cart)
    } catch (error) {
        errorRes(res, error)
    }
}

module.exports = { addtoCart, getCart }