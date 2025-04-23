const Address = require("../models/address.model")
const User = require("../models/user.model")
const { successRes, customRes, errorRes } = require("../utils/responseHandler")

const addAddress = async (req, res) => {
    try {
        const { street, city, state, zip, country } = req.body
        const userId = req.user._id

        const user = await User.findOne({ _id: userId })
        if (!user) {
            return customRes(res, false, "User not found!", 400)
        }

        if (!street || !city || !state || !zip || !country) {
            return customRes(res, false, "All Fields Required!", 400)
        }

        const existingLocation = await Address.findOne({ $or: [{ street }, { zip }] })
        if (existingLocation) {
            return customRes(res, false, "Street or ZIP already exists!", 400)
        }

        const address = new Address({
            user: userId,
            street,
            city,
            state,
            zip,
            country
        })

        await address.save()

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { addresses: [address._id] } },
            { new: true }
        )

        return successRes(res, "New address added!", 201, { address, updatedUser })
    } catch (error) {
        return errorRes(res, error)
    }
}

module.exports = { addAddress }