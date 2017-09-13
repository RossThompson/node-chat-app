var socket = io();
socket.on('connect',function(){
  console.log('connected to server');






});

socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('newMessage',function(message){

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});



socket.on('newLocationMessage',function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    var formattedTime = moment(message.createdAt).format('h:mm a');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

});





jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage',{
    from:'User',
    text:messageTextBox.val() //gets value from message box
  },function(){
    messageTextBox.val('') //clears message box once sent
  })
});



var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation)
  {
    return alert('Geolocation not supported by your current browser');
  }

  locationButton.attr('disabled','disabled').addClass('btn-danger').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').removeClass('btn-danger').text('Send Location');
    socket.emit('createLocationMessage',{latitude:position.coords.latitude,longitude:position.coords.longitude});
  },function(){
    alert('Unable to fetch location.')
    locationButton.removeAttr('disabled');
  })
})
