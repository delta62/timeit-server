var path = require('path');

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mocha: {
            src: ['test/**/*.html']
        },
        express: {
            timeitServer: {
                options: {
                    port: 8080,
                    serverreload: true,
                    server: path.resolve('./src/server.js')
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('default', [
        'mocha',
        'express'
    ]);
};
