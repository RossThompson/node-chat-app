const path = require('path');
const express = require('express'); //requires express module
const socketIO = require('socket.io');

const app = express(); //initiates express in app variable
const publicPath = path.join(__dirname ,'../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io= socketIO(server);

io.on('connection',(socket)=>{
  socket.on('disconnect',()=>{
    console.log('new user connected');
  })
});
app.use(express.static(publicPath))
app.listen(port,()=>{
  console.log(`we up on port: ${port}`);
})
console.log(__dirname + '/../public');
console.log(publicPath);
