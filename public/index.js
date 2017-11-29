// Make connection
var socket = io.connect("https://chat-app-nodejs-practice.herokuapp.com/");

// inputs  

var message = document.getElementById('message');
var output = document.getElementById('output');
var btn = document.getElementById('send');
var handle = document.getElementById('handle');
var typer = document.getElementById('typer');
var chatWindow = document.getElementById('Chat-Window');
var chat = document.getElementById('Chat-App');
var form = document.getElementById('form');
var messageForm = document.getElementById('message-form');
var username = document.getElementById('username');

chat.style.display = 'none';

// event handlers

// btn.addEventListener('click', function(){
//     socket.emit('chat', {
//         message: message.value,
//         handle: username.innerHTML
//     })
//     message.value = ''
// })

messageForm.addEventListener('submit', function(e){
    e.preventDefault();
    socket.emit('chat', {
        message: message.value,
        handle: username.innerHTML
    })
    message.value = ''
})

message.addEventListener('keydown', function(){
    socket.emit('typing', username.innerHTML);
})

form.addEventListener('submit', function(e){
    e.preventDefault();
    chat.style.display = 'block';
    username.innerHTML = handle.value;
    form.style.display = 'none';
})

// response from server

socket.on('chat', function(data){
    typer.innerHTML = ""
    output.innerHTML += "<p><strong>" + data.handle + "</strong>: " + data.message + "</p>";
    chatWindow.scrollTop = chatWindow.scrollHeight;
})

socket.on('typing', function(data){
    typer.innerHTML = "<p><em>" + data + " is typing a message...</em></p>"
    chatWindow.scrollTop = chatWindow.scrollHeight;
})