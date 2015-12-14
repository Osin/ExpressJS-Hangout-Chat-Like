var socket = io.connect('http://localhost:8080');
var username = prompt('Quel est votre nom ?');
if(username !== null){
    socket.emit('set_username', username);
}
