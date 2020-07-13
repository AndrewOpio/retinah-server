const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

io.on("connection", socket => {
    //recieving and sending messages
    socket.on("message", msg =>{
        io.emit(msg.receiver, msg.text, msg.type, msg.sender, msg.lat, msg.lng);
    }); 
    //emitted when a message is sent inorder to update chats
    socket.on("sent", msg =>{
        io.emit("sent"+ msg.email, msg.email);
    });

     //emitted when a message is sent inorder to update chats
     socket.on("profile", msg =>{
        io.emit("sent"+ msg.email, msg.email);
    });

    //update messages from unread to read
    socket.on("update", msg =>{  
        io.emit("update"+ msg.email, msg.email);
    });

    //listening to posts
    socket.on("post", msg =>{  
        io.emit("post",  msg);
    });

     //listening to deletes
     socket.on("delete", msg =>{  
        io.emit("delete",  msg);
    });


    //updating the profile pic after changing it
     socket.on("propic", msg =>{
        io.emit(msg.email, msg.text);
    });

    //sending notifications to users by district
    socket.on("notification", msg =>{
        io.emit(msg.district, msg.title, msg.message);
    });
    
    //Listening in to comments and updating the homepage
    socket.on("comment", msg =>{
        io.emit("comment"+msg.email, msg);
    });
}); 

server.listen(process.env.PORT || 5000 /*console.log("server running on" + " " + port)*/);