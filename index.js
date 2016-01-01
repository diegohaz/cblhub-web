var express = require('express');
var compression = require('compression');
var app = express();

app.use(compression());

app.use('/', express.static(__dirname + '/dist'));
app.use('/', express.static(__dirname + '/public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.get(/^((?!bower_components).)*$/, function(req, res) {
  res.set('Content-Type', 'text/html');
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 8080);