var express = require('express');
var bodyParser = require('body-parser');
var store = require('./inMemoryStore');

var app = express();

app.use(bodyParser.json());
app.set('views', 'src/tmpls');
app.set('view engine', 'jade');

app.post('/v1/data', function (request, response) {
    console.log('data received:');
    console.log('==============');
    console.log(request.body);

    store.add(request.body);

    response.send();
});

app.use('/v1/repository', function (request, response) {
    response.format({
        text: function () {
            response.send('NOT SUPPORTED');
        },
        html: function () {
            response.render('repositoryDump', {
                pageTitle: 'timeit-server raw dump',
                message: 'timeit-server Dump',
                objs: store.items()
            });
        },
        json: function () {
            response.send(store.items());
        },
        xml: function () {
            response.send('NOT SUPPORTED');
        },
        default: function () {
            response.send(store.items());
        }
    });
});

app.use(express.static('src/public'));

module.exports = app;
