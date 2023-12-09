var express = require('express');
var socket = require('socket.io');

// App setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));

// Server Socket Event Listner
var io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    // Get Message from the client and emit to all the clients connected to it on chat channel
    socket.on('chat', function(data){
        // console.log(data);
        io.sockets.emit('chat', data);
    });

    // Handle typing event (broadcast event makes sure that the data is emited to all the members except the present user who is typing)
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});