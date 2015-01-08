var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.post('/data', function(request, response) {
    console.log('data received:');
    console.log('==============');
    console.log(request.body);
    response.send();
});

app.use(express.static('src/public'));

exports = module.exports = app;
