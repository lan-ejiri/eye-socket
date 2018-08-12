//make connection
var socket = io.connect('http://localhost:4000');

var $message = $("#message");
var $handle = $("#handle");
var $sendbtn = $("#send");
var $output = $("#output");
var $feedback = $("#feedback");

//emit events

$sendbtn.on('click',function(){
    socket.emit('chat', {
        message: $message.val(),
        handle: $handle.val()
    })
})

$message.on('keypress',function(){
    socket.emit('typing', $handle.val())
})

//listen for events
socket.on('chat',function(data){
    $feedback.html("");
    $message.val('');
    $output.append(`<p><strong>${data.handle}:  </strong> ${data.message} </p>`);
})

socket.on('typing', function(data){
    $feedback.html(`<p><em> ${data} is typing a message...`)
})