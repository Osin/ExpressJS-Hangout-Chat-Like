var express = require('express'),
    app = express(),
    twig = require('twig');

app.use('/static', express.static('public'));

app.get('/', function(req, res){
   res.render('index.twig');
});
app.listen(8080);