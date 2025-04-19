const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
    }
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema);
