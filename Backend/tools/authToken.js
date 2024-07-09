const jwt = require('jsonwebtoken');

const authToken = (userId, res) => {
    const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '15d'});

    res.cookie('chatjwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return token;
};

module.exports = authToken;
