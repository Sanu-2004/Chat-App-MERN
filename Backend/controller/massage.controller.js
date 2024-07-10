const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");
const User = require("../models/user.model.js");
const { io, getSocketId } = require("../socket/Socket.js");

const sendMessage = async (req, res) => {
    try {
        const {id:receiverId} = req.params;
        const {message} = req.body;
        const senderId = req.user._id;

        if(!message) return res.status(400).json({message: "Message is required"});
        if(!receiverId) return res.status(400).json({message: "Receiver id is required"});
        if(!senderId) return res.status(400).json({message: "Sender id is required"});

        const receiver = await User.findById(receiverId);

        if(!receiver) return res.status(404).json({message: "Receiver not found"});

        const conversation = await Conversation.findOne({
            members: {$all: [senderId, receiverId]}
        });

        if(!conversation) {
            const conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        conversation?.messages.push(newMessage._id);

        await conversation.save();

        const receiverSocketId = getSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }


        res.status(200).json({
            newMessage
        });


    } catch (error) {
        console.log("Error in sendMessage controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const getMessages = async (req, res) => {
    try {
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            members:{$all: [senderId, receiverId]}
        }).populate("messages");

        let msg = [];

        if(conversation){
            msg = conversation.messages;
        }

        res.status(200).json(msg);
        
    } catch (error) {
        console.log("Error in getMessages controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
};


module.exports = {sendMessage, getMessages};