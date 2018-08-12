//require files
var express = require('express');
var socket = require('socket.io');

//set up app and port
var app = express();

var PORT = 4000;
var server = app.listen(PORT, function () {
    console.log("listening on port", PORT);
});

//static public files
app.use(express.static('public'));

//set up socket
var io = socket(server);

io.on('connection',function(socket){
    console.log("made socket connection",socket.id);

    //chat
    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    })

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data)
    })
});
