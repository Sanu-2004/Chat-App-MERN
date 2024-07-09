const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const authorizetoken = async (req, res, next) => {
    try {
        const token =  req.cookies.chatjwt;

        if(!token) return res.status(401).json({message: "Token not found"});

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken) return res.status(401).json({message: "Token not verified"});

        const user = await User.findById(verifyToken.id).select('-password');

        if(!user) return res.status(401).json({message: "user not found"});

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in authorizetoken middleware: ", error);
        res.status(401).json({message: "Unauthorized"});
    }
};

module.exports = authorizetoken;