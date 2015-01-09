var _ = require('../bower_components/underscore/underscore');

function inMemoryStore () {
    var items = [];

    function add (data) {
        if (!data) {
            return;
        }

        validateDataObject(data);
        items.push(data);
    }

    function validateDataObject (data) {
        data.name = data.name || 'Untitled';
        data.sequence = data.sequence || null;
        data.timestamp = data.timestamp || null;
    }

    return {
        add: add,
        items: function() {
            return _.map(items, _.clone);
        }
    }
}

module.exports = inMemoryStore();
