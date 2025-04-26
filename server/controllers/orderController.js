const Order = require("../models/order.model")
const Cart = require("../models/cart.model")
const { successRes, customRes, errorRes } = require("../utils/responseHandler")

const newOrder = async (req, res) => {
    try {
        const { shippingLocation } = req.body
        const userId = req.user._id

        if (!shippingLocation) {
            customRes(res, false, "All fields required!", 400)
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.product')

        if (!cart || cart.items.length === 0) {
            return customRes(res, false, "Cart is empty, cannot create order!", 400);
        }

        const totalPrice = cart.items.reduce((sum, item) => {
            if (item.product) {
                return sum + (item.product.price * item.quantity);
            }
            return sum
        }, 0);

        const cartItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity
        }));

        const order = new Order({
            user: userId,
            orderItems: cartItems,
            totalPrice,
            shippingLocation
        })

        await order.save()

        cart.items = [];
        await cart.save();

        return successRes(res, "Order created successfully!", order);
    } catch (error) {
        errorRes(res, error)
    }
}

module.exports = { newOrder }