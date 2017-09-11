var expect = require('expect');

var {generateMessage} =  require('./message');

describe('generateMessage',()=>{
  it('should generate Message',()=>{
    var from = 'Bob';
    var text = 'Some message';
    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('string');
    expect(message).toInclude({from,text});
  });
});
