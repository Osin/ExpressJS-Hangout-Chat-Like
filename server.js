var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    twig = require('twig'),
    http = require('http').Server(app),
    io = require('socket.io').listen(server),
    session = require('express-session');

var users = [];

app.use('/static', express.static('public'))
    .use(session({
            secret: "I love cat",
            resave: false,
            saveUninitialized: false
        }
    ))
    .use(function (req, res, next) {
        next();
    });


// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un utilisateur est connecté !');
    socket.on('set_username', function (username) {
        session.username = username;
        users.push(username);
        console.log(session.username);
        console.log(users);
        socket.emit('message', users);
    });
});


app.get('/', function (req, res) {
    res.render('index.twig');
});
server.listen(8080);