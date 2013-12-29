'user strict';

module.exports = function (grunt) {

  var path = require('path'),
      matchdep = require('matchdep');
  
  var config = {
    app: 'src/app',
    server: 'src/server',
    test: 'test',
    dist: 'dist'
  };

  var clientJsHint = grunt.file.readJSON('.jshintrc'),
      serverJsHint = grunt.file.readJSON('.jshintrc');

  var clientScripts = [
    path.join(config.app, 'js/**/*.js')
  ];
  
  var serverScripts = [
    'Gruntfile.js',
    path.join(config.server, 'app.js'),
    path.join(config.test, '**/*.js')
  ];

  // var allScripts = clientScripts.concat(serverScripts);

  clientJsHint.browser = true; // Don't throw errors for expected browser globals
  serverJsHint.node = true; // Don't throw errors for expected Node globals

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Grunt config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      browser: {
        src: clientScripts,
        options: clientJsHint
      },
      node: {
        src: serverScripts,
        options: serverJsHint
      }
    },

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
      files: path.join(config.test, 'features'),
      options: {
        steps: path.join(config.test, 'features/step_definitions')
      }
    }
  });

  grunt.registerTask('default', [
    'jshint'
  ]);

  grunt.registerTask('server', [
    'express',
    'express-keepalive'
  ]);

  grunt.registerTask('test', [
    'express:test',
    'cucumberjs'
  ]);
};