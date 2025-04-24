const Address = require("../models/address.model")
const User = require("../models/user.model")
const { successRes, customRes, errorRes } = require("../utils/responseHandler")

const addAddress = async (req, res) => {
    try {
        const { street, city, state, zip, country } = req.body
        const userId = req.user._id

        if (!street || !city || !state || !zip || !country) {
            return customRes(res, false, "All Fields Required!", 400)
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

        await User.findByIdAndUpdate(
            userId,
            { $push: { addresses: [address._id] } },
            { new: true }
        )

        return successRes(res, "New address added!", address)
    } catch (error) {
        return errorRes(res, error)
    }
}

const updateAddress = async (req, res) => {

    try {
        const { street, city, state, zip, country } = req.body
        const { id: addId } = req.params

        if (!street || !city || !state || !zip || !country) {
            return customRes(res, false, "All Fields Required!", 400)
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            addId,
            { street, city, state, zip, country },
            { new: true }
        )

        return successRes(res, "Address Updated!", updatedAddress)
    } catch (error) {
        return errorRes(res, error)
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { id: addId } = req.params
        const userId = req.user._id
        const address = await Address.findByIdAndDelete(addId)

        await User.findByIdAndUpdate(
            userId,
            { $pull: { addresses: addId } },
            { new: true }
        )

        if (!address) {
            return customRes(res, false, "Address not found!", 404)
        }

        return successRes(res, "Address deleted successfully!", address)
    } catch (error) {
        return errorRes(res, error)
    }
}


const getAddress = async (req, res) => {
    try {
        const userId = req.user._id

        const addresses = await Address.find({ user: userId });

        return successRes(res, "User Addresses!", addresses)
    } catch (error) {

    }
}

module.exports = { addAddress, updateAddress, deleteAddress, getAddress }