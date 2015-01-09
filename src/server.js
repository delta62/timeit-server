var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var store = require('./inMemoryStore');

var defaultSession = "default";
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.set('views', 'src/tmpls');
app.set('view engine', 'jade');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/v1/data', function (request, response) {
    store.add(request.body);
    response.send();
});

app.use('/v1/session/:sessionId', function (request, response) {
    if (!request.sessionId) {
        request.sessionId = defaultSession;
    }

    response.format({
        text: function () {
            response.send('NOT SUPPORTED');
        },
        html: function () {
            response.render('repositoryDump', {
                pageTitle: 'timeit-server raw dump',
                message: 'timeit-server Dump',
                objs: getItems(defaultSession)
            });
        },
        json: function () {
            response.send(getItems(defaultSession));
        },
        xml: function () {
            response.send('NOT SUPPORTED');
        },
        default: function () {
            response.send(getItems(defaultSession));
        }
    });
});


app.use(express.static('src/public'));

module.exports = app;

function getItems(sessionName) {
    var items = store.getSessionItems(sessionName);
    if (!items) {
        items = [];
    }
    return items;
}
