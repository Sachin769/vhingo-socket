// const express = require('express');
import express from "express";
import { Server } from 'socket.io';
const app = express();
const port = 4000;
// const wifiIp = "192.168.1.4"
var server = app.listen(port, () => {
    console.log(`Server is running ${port}`);
});

const io = new Server(server, {
    cors: { origin: "*" }
});

app.get("/", (req, resp) => {
    resp.status(200).json("socket is running");
})


io.on('connection', (socket) => {
    console.log('connection establish');
    socket.emit("connected","nodejs establish connection");

    socket.on("trucking",(btnKaMsg)=>{
        const room = btnKaMsg.room;
        socket.join(room);
        console.log("location",btnKaMsg);
        socket.in(room).emit("message recieved",btnKaMsg);
        io.to(room).emit("track location",btnKaMsg);
        console.log("Done");
    })
    socket.on("join", (room) => {
        socket.join(room);

        socket.on("new message", (message) => {
            console.log("message of kotlin",message);
            console.log('Message room:', room);
            io.to(room).emit("message recieved", message);
            console.log('Message received:', message);
        });

        socket.on("trucking", (messageobject) => {
            console.log('Message room:', room);
            io.to(room).emit("trucking", messageobject);
            console.log('sdfasf', messageobject);
        });
    });
    // socket.on("new message", (message) => {
    //     const room = Object.keys(socket.rooms)[0]; // Get the room of the current socket
    //     console.log('Message room:', room);
    //     socket.broadcast.to(room).emit("message received", message);
    //     console.log('Message received:', message);
    // });

    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
})




