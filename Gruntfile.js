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
    path.join(config.server, '**/*.js'),
    path.join(config.test, '**/*.js')
  ];

  var allScripts = clientScripts.concat(serverScripts);

  clientJsHint.browser = true; // Don't throw errors for expected browser globals
  serverJsHint.node = true; // Don't throw errors for expected Node globals

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Grunt config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jsbeautifier: {
      modify: {
        src: allScripts,
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: allScripts,
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },

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
      dev: {
        options: {
          port: 9000,
          server: path.resolve(__dirname, config.server, 'app.js'),
          bases: [path.resolve(__dirname, config.server)]
        }
      },
      test: {
        options: {
          port: 9001,
          server: path.resolve(__dirname, config.server, 'app.js'),
          bases: [path.resolve(__dirname, config.test)]
        }
      },
      dist: {
        options: {
          port: 9002,
          server: path.resolve(__dirname, config.dist, 'app.js'),
          bases: [path.resolve(__dirname, config.dist)]
        }
      }
    },

    open: {
      dev: {
        url: 'http://localhost:<%= express.dev.options.port %>',
        app: 'Google Chrome'
      }
    },

    cucumberjs: {
      files: path.join(config.test, 'features'),
      options: {
        steps: path.join(config.test, 'features/step_definitions')
      }
    }
  });

  // Clean & verify code (Run before commit)
  grunt.registerTask('default', [
    'jsbeautifier:modify',
    'jshint'
  ]);

  // Verify code (Read only)
  grunt.registerTask('verify', [
    'jsbeautifier:verify',
    'jshint'
  ]);

  // Start server
  grunt.registerTask('server', [
    'express:dev',
    'open:dev',
    'express-keepalive'
  ]);

  // Run tests
  grunt.registerTask('test', [
    'jsbeautifier:verify',
    'jshint',
    'express:test',
    'cucumberjs'
  ]);
};
