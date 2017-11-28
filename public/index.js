// Make connection
var socket = io.connect("https://chat-app-nodejs-practice.herokuapp.com/");

// inputs  

var message = document.getElementById('message');
var output = document.getElementById('output');
var btn = document.getElementById('send');
var handle = document.getElementById('handle');
var typer = document.getElementById('typer');
var chat = document.getElementById('Chat-Window');

// event handlers

btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
    message.value = ''
})

message.addEventListener('keydown', function(){
    socket.emit('typing', handle.value);
})

// response from server

socket.on('chat', function(data){
    typer.innerHTML = ""
    output.innerHTML += "<p><strong>" + data.handle + "</strong>: " + data.message + "</p>";
    chat.scrollTop = chat.scrollHeight;
})

socket.on('typing', function(data){
    typer.innerHTML = "<p><em>" + data + " is typing a message...</em></p>"
    chat.scrollTop = chat.scrollHeight;
})