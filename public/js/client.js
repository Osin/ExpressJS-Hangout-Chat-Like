var socket = io.connect('http://localhost:8080');
var username = prompt('Quel est votre nom ?');
if(username !== null){
    socket.emit('set_username', username);
}
socket.on('message', function(users){
    $('#contactList').html("");
    for(var user in users){
        $('#contactList').append(
            '<div class="col-xs-4">' +
            '<img src="http://api.randomuser.me/portraits/men/49.jpg" alt="Scott Stevens" class="img-responsive img-circle" />' +
            '</div>' +
            '<div class="col-xs-8">' +
            '<span class="name">'+users[user]+'</span>' +
            '</div>'
        );
    }
});
