const expect = require('expect');

const {isRealString} = require('./validation');


describe('isRealString',()=>{
  it('should reject non string values',()=>{
    var nonString = 55;

    expect(isRealString(nonString)).toEqual(false);
  });

  it('should reject string with only spaces', () => {
    var res = isRealString('    ');
    expect(res).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var res = isRealString('D');
    expect(res).toBe(true);
  });
});
