var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    twig = require('twig'),
    http = require('http').Server(app),
    io = require('socket.io').listen(server),
    session = require('express-session');

var test = 1;
app.use('/static', express.static('public'))
    .use(session({
            secret: "I love cat",
            resave: false,
            saveUninitialized: false
        }
    ))
    .use(function (req, res, next) {
        var users = req.session.users;
        if (!users) {
            users = req.session.users = {}
        }
        next();
    });


// Quand on client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
        console.log('Un client est connecté !');
        console.log('session' + session.username);
    socket.on('set_username', function (username) {
        session.username = username;
        });
    });


app.get('/', function (req, res) {
    console.log(req.session);
    res.render('index.twig');
    test++;
    console.log(test);
});
server.listen(8080);