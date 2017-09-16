const expect = require('expect');
const {Users} = require('./users');



describe('Users',()=>{
  var users;
  beforeEach(()=>{

    users = new Users();
    users.users = [{
      id:'9',
      name:'Dracula',
      room:'Castlevania'
    },{
      id:'8',
      name:'Mr.Goosh',
      room:'Goosh Room'
    },{
      id:'7',
      name:'Billy',
      room:'Goosh Room'
    }]
  })

  it('it should add new Users',()=>{
    var users = new Users();
    var user = {
      id:'123',
      name:'guy',
      room:'place'
    };
    var resUsers = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

//REMOVE USER TEST CASES
  it('Remove a User',()=>{
  var userID = '9';
  var user = users.removeUser(userID);


    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);

  });


  it('Should not remove user', ()=>{
    var userID = '55';
    var user = users.removeUser(userID);


      expect(user).toNotExist();

    });

    it('should find user',()=>{
      var userID ='9';
      var user = users.getUser(userID);

      expect(user.id).toBe(userID);

    })

    it('should not find user',()=>{
      var userID ='99';
      var user = users.getUser(userID);

      expect(user).toNotExist();

    })






  //

  it('should return names for Goosh Room',()=>{
    var userList = users.getUserList('Goosh Room');
    expect(userList).toEqual(['Mr.Goosh','Billy']);
  });

  it('should return names for Castlevania',()=>{
    var userList = users.getUserList('Castlevania');
    expect(userList).toEqual(['Dracula']);
  });
});
