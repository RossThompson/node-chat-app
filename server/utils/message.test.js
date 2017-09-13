//const moment = require('moment');
var expect = require('expect');

var {generateMessage,generateLocationMessage} =  require('./message');

describe('generateMessage',()=>{
  it('should generate Message',()=>{
    var from = 'Bob';
    var text = 'Some message';
    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});

describe('generateLocationMessage', ()=>{
  it('should genreate Location message', ()=>{
    var from = 'Bobbet';
    var latitude = 2;
    var longittude = 3;
    var message = generateLocationMessage(from,latitude,longittude);

     expect(message.createdAt).toBeA('number');
     expect(message.url).toEqual('https://www.google.com/maps?q=2,3');


  });
});
