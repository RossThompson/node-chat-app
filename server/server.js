const path = require('path');
const express = require('express'); //requires express module

const app = express(); //initiates express in app variable
const publicPath = path.join(__dirname ,'../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath))
app.listen(port,()=>{
  console.log(`we up on port: ${port}`);
})
console.log(__dirname + '/../public');
console.log(publicPath);
