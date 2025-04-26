const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    street: {
        type: String,
        required: [true, "Please add a street name"],
        trim: true
    },
    city: {
        type: String,
        required: [true, "Please add a city name"],
        trim: true
    },
    state: {
        type: String,
        required: [true, "Please add a state name"],
        trim: true
    },
    zip: {
        type: String,
        required: [true, "Please add a zipcode"],
        trim: true
    },
    country: {
        type: String,
        required: [true, "Please select a country"],
        trim: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Address', addressSchema)