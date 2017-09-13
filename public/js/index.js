function scrollToBottom(){
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessgaeHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight+scrollTop+newMessgaeHeight + lastMessageHeight >= scrollTop)
  {
    messages.scrollTop(scrollHeight);
  }

}

var socket = io();
socket.on('connect',function(){
  console.log('connected to server');






});

socket.on('disconnect',function(){
  console.log('disconnected from server');
});

socket.on('newMessage',function(message){
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = jQuery('#message-template').html();
var html = Mustache.render(template,{
  text:message.text,
  from:message.from,
  createdAt:formattedTime
});

jQuery('#messages').append(html);
scrollToBottom();


  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});



socket.on('newLocationMessage',function(message){
var locationTemplate = jQuery('#location-message-template').html();
var formattedTime = moment(message.createdAt).format('h:mm a');

var html = Mustache.render(locationTemplate,{
  url:message.url,
  createdAt:formattedTime,
  from:message.from

});

    jQuery('#messages').append(html);
    scrollToBottom();
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
