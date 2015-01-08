var express = require('express');
var bodyParser = require('body-parser');
var store = require('./inMemoryStore');

var app = express();
app.use(bodyParser.json());

app.post('/data', function(request, response) {
    console.log('data received:');
    console.log('==============');
    console.log(request.body);

    store.add(request.body);

    console.log("Number of items: " + store.items().length);

    response.send();
});

app.use('/repository', function(request, response) {
    
});

app.use(express.static('src/public'));

exports = module.exports = app;
