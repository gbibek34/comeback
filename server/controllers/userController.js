const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { getToken } = require("../utils/authHandler");
const { successRes, customRes, errorRes } = require("../utils/responseHandler")

const hash = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pw, salt);
    return hashedPassword
}

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, phone } = req.body

        // Field Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            customRes(res, false, "All fields are required!", 400)
        }

        // Email Validation
        const emailRegex = /.+\@.+\..+/;

        if (!emailRegex.test(email)) {
            customRes(res, false, "Please enter a valid email address!", 400)
        }

        // Password confirmation check
        if (password !== confirmPassword) {
            customRes(res, false, "Passwords do not match!")
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return customRes(res, false, 'A user with that email already exists!', 400)
        }

        // Create a new user instance
        const user = new User({
            firstName,
            lastName,
            email,
            password: await hash(password),
            phone
        });

        // Save the user to the database
        await user.save();

        // Send a success response
        return successRes(res, 'User registered successfully!', {token:getToken(user)})

    } catch (error) {
        return errorRes(res, error)

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Field Validation
        if (!email || !password) {
            return customRes(res, false, "Email and password are required", 400)
        }

        // Email Validation
        const emailRegex = /.+\@.+\..+/;

        if (!emailRegex.test(email)) {
            return customRes(res, false, "Please enter a valid email address!", 400)
        }

        // Checking for User
        const user = await User.findOne({ email });
        if (!user) {
            return customRes(res, false, "Invalid credentials!", 401)
        }

        // Compare the given password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return customRes(res, false, "Invalid credentials!", 401)
        }

        return successRes(res, "Login Successful", { token: getToken(user) })

    } catch (error) {
        return errorRes(res, error)
    }
}

const updateProfile = async (req, res) => {
    try {
        const { id: userId } = req.params
        const { firstName, lastName, email, password, phone } = req.body

        if (!firstName || !lastName || !email || !password || !phone) {
            return customRes(res, false, "All fields are required!", 400)
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, password: await hash(password), phone },
            { new: true }
        )

        if (!updatedUser) {
            return customRes(res, false, "User not found!", 404)
        }
        return successRes(res, "User updated successfully", updatedUser)
    } catch (error) {
        return errorRes(res, error)
    }
    //!
    // const userId = req.params.id;
    // const user = await User.findById(userId);
    // if (user) {
    //     user.name = req.body.name || user.name
    //     user.email = req.body.email || user.email
    //     user.password = await hash(req.body.password) || user.password
    //     const updatedUser = await user.save();
    //     successRes(res, "User Updated!", {
    //         user: {
    //             _id: updatedUser.id,
    //             name: updatedUser.name,
    //             email: updatedUser.email,
    //             isAdmin: updatedUser.isAdmin
    //         }
    //     })
    // } else {
    //     res.status(401).json({
    //         message: "Invalid user data"

    //     })

    // }
}

const getProfile = async(req, res) => {
    const userId = req.user._id
    try{
        const user = await User.findById(userId)
        if(!user){
            return customRes(res, false, "USER DOES NOT EXIST", 404)
        }

        return successRes(res, "USER FOUND",user)

    }catch(err){
        return errorRes(res, err)
    }
}



const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            user.isAdmin = true;
            const updatedUser = await user.save();
            return res.send({
                message: 'User promoted to admin',
                user: updatedUser,
            });
        } else {

            const newUser = new User({
                name,
                email,
                password: await hash(password),
                isAdmin: true,
            });

            const savedUser = await newUser.save();
            return res.send({
                message: 'New admin created',
                user: savedUser,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

const deleteProfile = async(req, res) =>{
    const userId = req.user._id;
    try{
        const user = await User.findByIdAndDelete(userId);
        if (!user){
            return customRes(res, false, "USER NOT FOUND !!!",404)
        }
        return successRes(res, "USER PROFILE DELETED SUCCESSFULLY!!")
    }catch(err){
        return errorRes(res, err)
    }
}

module.exports = { registerUser, loginUser, updateProfile, createAdmin, getProfile, deleteProfile }