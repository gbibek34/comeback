const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const {getToken} = require(getToken);


const hash = async(pw) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pw, salt);
    return hashedPassword
}

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


        // Create a new user instance
        const user = new User({
            firstName,
            lastName,
            email,
            password: hash(password),
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
            },
            token: getToken(user)
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

      
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: getToken(user)

            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unexpected Error!",
            error: error
        })
    }
}

const updateProfile = async(req, res) =>{
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = hash(req.body.password) || user.password
        const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            _id: updatedUser.id,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
        
    }else{
        res.status(401).json({
            message: "Invalid user data"

        })

    }
}

const createAdmin = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      let user = await User.findOne({ email });
  
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
          password: hash(password),
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

module.exports = { registerUser, loginUser, updateProfile, createAdmin }