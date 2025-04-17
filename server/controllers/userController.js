const User = require("../models/user.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, phone } = req.body

        // Field Validation
        if (!firstName | !lastName | !email | !password | !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            })
        }

        // Email Validation
        const emailRegex = /.+\@.+\..+/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address!'
            });
        }

        // Password confirmation check
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match!'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'A user with that email already exists!'
            });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone
        });

        // Save the user to the database
        await user.save();

        // Send a success response
        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    } catch (error) {
        // Error Response
        res.status(500).json({
            success: false,
            message: 'Unexpected error!',
            error: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        // Field Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required!'
            });
        }

        // Email Validation
        const emailRegex = /.+\@.+\..+/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address!'
            });
        }

        // Checking for User
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }

        // Compare the given password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }

        // If the password matches, login is successful.
        //TODO:
        // Generate a token (JWT) before sending the response.
        res.status(200).json({
            success: true,
            message: 'Login successful',

            //TODO:
            // token: generateToken(user) // Optionally generate and return a token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unexpected Error!",
            error: error
        })
    }
}

module.exports = { registerUser, loginUser, }