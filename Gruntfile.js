'user strict';

var path = require('path'),
    matchdep = require('matchdep');

module.exports = function (grunt) {

    var config = {
        app: 'src/app',
        server: 'src/server',
        test: 'test',
        dist: 'dist'
    };

    matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        express: {
            options: {
                server: path.resolve(__dirname, config.server, 'app.js'),
                port: 9000,
                hostame: '*'
            },
            livereload: {
                options: {
                    server: path.resolve(__dirname, config.server, 'app.js'),
                    bases: [path.resolve(__dirname, config.app, 'public')],
                    livereload: true, // if you just specify `true`, default port `35729` will be used
                    serverreload: true
                }
            },
            test: {
                options: {
                    port: 9001,
                    bases: [path.resolve(__dirname, config.test)]
                }
            },
            dist: {
                options: {
                    port: 9002,
                    bases: [path.resolve(__dirname, config.dist)]
                }
            }
        },

        cucumberjs: {
            files: 'test/features',
            options: {
                steps: 'test/features/step_definitions'
            }
        }
    });

    grunt.registerTask('server', [
        'express',
        'express-keepalive'
    ]);

    grunt.registerTask('test', [
        'express:test',
        'cucumberjs'
    ]);
};