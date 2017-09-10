const path = require('path');
const http = require('http'); //adds http module
const express = require('express'); //adds express module
const socketIO = require('socket.io');//adds socket.io


const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
const app = express(); //initiates express in app variable

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath)); //tells express to use index.html file in public folder

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });


//Greeting message to new user
socket.emit('newMessage',{
  from:'Admin',
  text:'Welcome to the Goosh Goosh Chat ',
  createdAt: new Date().getTime()
});

//Sends message from Server alerting Users of new person
socket.broadcast.emit('newMessage',{
  from:'Admin',
  text:'New User has joined the Chat. Goosh Goosh!',
  createdAt: new Date().getTime()
})

socket.on('createMessage',(message)=>{
  console.log('message received',message);
  io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt: new Date().getTime()
  });
  // socket.broadcast.emit('newMessage',{
  //   from:message.from,
  //   text:message.text,
  //   createdAt: new Date().getTime()
  //
  //
  // })
});


});

server.listen(port,()=>{
  console.log(`we up on port: ${port}`);
})
