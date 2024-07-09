const {Server} = require('socket.io');
const {createServer} = require('http');
const express = require('express');

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

const getSocketId = (userId) => {
    return socketMap[userId];
}

const socketMap = {}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if(userId){
        socketMap[userId] = socket.id;
    }
    socket.emit("online", Object.keys(socketMap));
    socket.on('disconnect', () => {
        delete socketMap[userId];
        socket.emit("online", Object.keys(socketMap));
    });
});

module.exports = {app, io, server, getSocketId}