const path = require('path');
const http = require('http'); //adds http module
const express = require('express'); //adds express module
const socketIO = require('socket.io');//adds socket.io

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
const app = express(); //initiates express in app variable

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath)); //tells express to use index.html file in public folder

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id)
    if(user)
    {
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.room} has left`));

    }
    console.log('User was disconnected');
  });


socket.on('join',(params,callback)=>{
  //checks if Username and roomname are strings
    if(!isRealString(params.name) || !isRealString(params.room))
    {

      return callback('Name and room name are required')
    }else if (users.getUserList(params.room).find((username)=>username == params.name)){ // checks if username is taken
      return callback('Name Taken')
    }



    //adds user to room
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUserList(params.room))



    //Greeting message to new user
    socket.emit('newMessage',generateMessage('Admin','Welcome to the Goosh Goosh Chat '));

    //Sends message from Server alerting Users of new person
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined the Goosh Goosh Clan!`));
    callback();
});



socket.on('createMessage',(message,callback)=>{
  console.log('message received',message);

  var user = users.getUser(socket.id);
  if(user && isRealString(message.text)){

  }
  io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
  callback();

});

//Generate Location message
socket.on('createLocationMessage',(coords)=>{
  var user = users.getUser(socket.id);
  io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,`${coords.latitude}`,`${coords.longitude}`))
});

});

server.listen(port,()=>{
  console.log(`we up on port: ${port}`);
})
