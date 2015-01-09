var _ = require('../bower_components/underscore/underscore');

function inMemoryStore () {
    var items = {};

    function add (data) {
        if (!data) {
            return;
        }

        _.each(data, function(entry) {
            validateDataObject(entry);
            addEntry(entry);
        });
    }

    function validateDataObject (data) {
        data.session = data.session || 'default';
        data.name = data.name || 'Untitled';
        data.sequence = data.sequence || null;
        data.timestamp = parseInt(data.timestamp) || null;
    }

    function addEntry (entry) {
        if (!items[entry.session]) {
            items[entry.session] = [];
        }
        items[entry.session].push(entry);
    }

    return {
        add: add,
        items: function() { return items; },
        getSessionItems: function(sessionId) { return items[sessionId]; }
    }
}

module.exports = inMemoryStore();
