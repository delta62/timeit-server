function inMemoryStore () {
    var items = [];

    return {
        add: function(object) {
            console.log('Adding object');
            items.push(object);
        },
        items: function() {
            return items;
        }
    }
}

exports = module.exports = inMemoryStore();
