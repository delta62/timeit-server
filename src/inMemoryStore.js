function inMemoryStore () {
    var items = [];

    return {
        add: function(data) {
            if (!data) {
                return;
            }

            data.name = data.name || 'Untitled';
            data.sequence = data.sequence || null;
            data.timestamp = data.timestamp || null;

            items.push(data);
        },
        items: function() {
            return items;
        }
    }
}

module.exports = inMemoryStore();

