$( document ).ready(function() {
  
  /*global io*/
  var socket = io();  
  socket.on('user', function(data) {
    $('#num-users').text(data.currentUsers+' users are online');
    let connectionMessage = data.name
    if (data.connected) {
      connectionMessage += ' has connected'
    } else {
      connectionMessage += ' has disconnected'
    }
    $('#messages').append($('<li>').html('<b>' + connectionMessage + '<\/b>'));
  })
  
  socket.on('chat message', function(data) {
    $('#messages').append($('<li>').html(data.name + ": " + data.message));
  })
  
  // Form submittion with new message in field with id 'm'
  $('form').submit(function(){
    var messageToSend = $('#m').val();
    //send message to server here?
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
  
});
