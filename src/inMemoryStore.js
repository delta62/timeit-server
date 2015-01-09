var _ = require('../bower_components/underscore/underscore');

function inMemoryStore () {
    var items = [];

    function add (data) {
        if (!data) {
            return;
        }

        _.each(data, function(entry) {
            validateDataObject(entry);
            items.push(entry);
        });
    }

    function validateDataObject (data) {
        data.name = data.name || 'Untitled';
        data.sequence = data.sequence || null;
        data.timestamp = parseInt(data.timestamp) || null;
    }

    return {
        add: add,
        items: function() {
            return _.map(items, _.clone);
        }
    }
}

module.exports = inMemoryStore();
