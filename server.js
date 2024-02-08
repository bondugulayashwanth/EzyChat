const express=require("express");
const http=require('http');
const path=require("path");
const socketio=require("socket.io");
const totalinfo=require("./message");
const {userjoin,curuser,userleave,roomuser} = require("./users");


const app=express();
const server=http.createServer(app);
const io =socketio(server);

app.use(express.static(path.join(__dirname,'public')));

io.on('connection',(socket)=>{

    socket.emit('message',totalinfo("EsyChat","Welcome to EzyChat"))
    

    socket.on("JoinRoom",(username)=>{

    const user=userjoin(socket.id,username);      

        // Broadcast when the user joined chat
    socket.broadcast.emit("message",totalinfo("EzyChat",`${username} joined the Chat`));


      //Send users info
      io.emit('roomusers',roomuser())

    // when a user disconnect
    socket.on('disconnect',()=>{
        const user=userleave(socket.id);
        io.emit('message',totalinfo("EzyChat",`${username} has left the Chat`));
        io.emit('roomusers',roomuser());
        });
    })

    // listen for the chatMessage event;
    socket.on('chatMessage',(msg)=>{

        const user=curuser(socket.id);
        io.emit('message',totalinfo(user.username,msg));
    })

})

server.listen(3000,()=> console.log('Server stared running'));




