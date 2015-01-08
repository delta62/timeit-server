var express = require('express');
var bodyParser = require('body-parser');
var store = require('./inMemoryStore');

var app = express();

app.use(bodyParser.json());
app.set('views', 'src/tmpls');
app.set('view engine', 'jade');

app.post('/data', function(request, response) {
    console.log('data received:');
    console.log('==============');
    console.log(request.body);

    store.add(request.body);

    response.send();
});

app.use('/repository', function(request, response) {
    response.render('repositoryDump', {
        pageTitle: 'timeit-server raw dump',
        message: 'timeit-server Dump',
        objs: store.items()
    });
});

app.use(express.static('src/public'));

module.exports = app;
