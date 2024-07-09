const User = require("../models/user.model");

const allFilterUsers = async (req, res) => {
    try {
        const id = req.user._id;

        const users = await User.find({_id: {$ne: id}}).select('-password');

        res.status(200).json(users);

    } catch (error) {
        console.log('Error in allFilterUsers user controller', error);
        res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {allFilterUsers};