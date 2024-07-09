const bcrypt = require('bcryptjs');
const User = require('../models/user.model.js');
const authToken = require('../tools/authToken.js');

const signup = async (req, res) => {
    try {
        const {name, email, password, confirmPassword, gender} = req.body;

        // validation

        if(!name || !email || !password || !confirmPassword){
            return res.status(400).json({message: "All fields are required"});
        }

        if(email.indexOf('@') === -1){
            return res.status(400).json({message: "Invalid email"});
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: "Passwords do not match"});
        }

        if(password.length < 6){
            return res.status(400).json({message: "Password should be atleast 6 characters long"});
        }

        if(!(gender === "male" || gender === "female" || gender === "other")){
            return res.status(400).json({message: "Invalid gender. It should be male, female or other"});
        }

        const user = await User.findOne({email});

        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        // password hashing

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);


        // save user to database

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            gender
        });

        await newUser.save();

        // generate token

        const token = authToken(newUser._id, res);

        res.status(201).json({
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                gender: newUser.gender,
                token
        });

    } catch (error) {
        console.log("Error in signup", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // validation

        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        if(email.indexOf('@') === -1){
            return res.status(400).json({message: "Invalid email"});
        }

        const user = await User.findOne({email});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!user || !isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        // generate token

        const token = authToken(user._id, res);

        res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                token
        });
    }
    catch (error) {
        console.log("Error in login", error);
        res.status(500).json({message: "Internal server error"});
    }
}

const logout = (req, res) => {
    res.cookie('chatjwt', "", {
        maxAge: 0,
        httpOnly: true
    });
    res.status(200).json({message: "User logged out successfully"});
};

module.exports = {signup, login, logout};