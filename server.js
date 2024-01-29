// const express = require('express');
import express from "express";
import { Server } from 'socket.io';
const app = express();
const port =  4000;
const wifiIp = "192.168.1.4"
var server = app.listen(port, () => {
    console.log(`Server is running ${port}`);
});

// const server = require('http').createServer(app);

// app.use((req, resp, next) => {
//     console.log("hiii");
//     resp.header("Access-Control-Allow-Origin", "*",);
//     resp.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//     resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Authorization,Content-Type,Accept");
//     next();
// });

const io = new Server(server, {
    cors: { origin: "*"}
});

app.get("/",(req,resp)=> {
    resp.status(200).json("socket is running");
})


io.on('connection', (socket) => {
    console.log('connection');

    socket.on('sendChatToServer', (message) => {
        console.log(message);

        io.emit('emmiting', message);
        socket.broadcast.emit('sendChatToClient', message);
    });


    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
});

