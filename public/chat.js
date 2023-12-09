// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

// Emit events (Send message to server)
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
});

// Listen for events from the server
socket.on('chat', function(data){
    feedback.innerHTML = '';      // once the send button is pressed the typing status must disappear
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

// Pass keypress event to the server to show that the user is typing tp ther members
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

// Listen for the keypress event of present user from the server and show it to other members
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});