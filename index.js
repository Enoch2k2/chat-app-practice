const express = require('express');
const socket = require('socket.io');
const app = express();

const server = app.listen(process.env.PORT || 3000, function(){
    console.log('listening on port 3000');
})

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function(socket){
 console.log('made socket connection', socket.id);

 // when server recieves a chat emit, it will call the function with the data
 socket.on('chat', function(data){
     // emits the data to all of the clients
     io.sockets.emit('chat', data);
 });

 socket.on('typing', function(data){
     socket.broadcast.emit('typing', data);
 });
})