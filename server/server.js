const path = require('path');
const http = require('http'); //adds http module
const express = require('express'); //adds express module
const socketIO = require('socket.io');//adds socket.io

const {generateMessage, generateLocationMessage} = require('./utils/message.js');


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
socket.emit('newMessage',generateMessage('Admin','Welcome to the Goosh Goosh Chat ')

);

//Sends message from Server alerting Users of new person
socket.broadcast.emit('newMessage',generateMessage('Admin','New User has joined the Chat. Goosh Goosh!'))

socket.on('createMessage',(message,callback)=>{
  console.log('message received',message);
  io.emit('newMessage',generateMessage(message.from,message.text));
  callback('This is from the server');

});

//Generate Location message
socket.on('createLocationMessage',(coords)=>{
  io.emit('newLocationMessage',generateLocationMessage('Admin',`${coords.latitude}`,`${coords.longitude}`))
});

});

server.listen(port,()=>{
  console.log(`we up on port: ${port}`);
})
