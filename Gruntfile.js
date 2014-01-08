'user strict';

var path = require('path'),
  matchdep = require('matchdep');

module.exports = function (grunt) {

  var config = {
    app: 'app',
    test: 'test',
    dist: 'dist'
  };

  var jsHint = grunt.file.readJSON('.jshintrc');

  var scripts = [
    'Gruntfile.js',
    'server.js',
    path.join(config.app, '**/*.js'),
    path.join(config.test, '**/*.js')
  ];

  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Grunt config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jsbeautifier: {
      modify: {
        src: scripts,
        options: {
          config: '.jsbeautifyrc'
        }
      },
      verify: {
        src: scripts,
        options: {
          mode: 'VERIFY_ONLY',
          config: '.jsbeautifyrc'
        }
      }
    },

    jshint: {
      node: {
        src: scripts,
        options: jsHint
      }
    },

    express: {
      dev: {
        options: {
          port: 9000,
          server: path.resolve(__dirname, config.app, 'app.js'),
          bases: [path.resolve(__dirname, config.app)]
        }
      },
      test: {
        options: {
          port: 9001,
          server: path.resolve(__dirname, config.app, 'app.js'),
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
      },
      dist: {
        url: 'http://localhost:<%= express.dist.options.port %>',
        app: 'Google Chrome'
      }
    },

    clean: {
      dist: {
        src: path.resolve(__dirname, config.dist)
      }
    },

    copy: {
      dist: {
        expand: true,
        cwd: 'app/',
        src: '**',
        dest: 'dist/'
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
  grunt.registerTask('beautify', [
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
    'verify',
    'express:dev',
    'open:dev',
    'express-keepalive'
  ]);

  // Run tests
  grunt.registerTask('test', [
    'verify',
    'express:test',
    'cucumberjs'
  ]);

  // Build
  grunt.registerTask('build', [
    'verify',
    'clean:dist',
    'copy:dist',
    'express:dist',
    'open:dist',
    'express-keepalive'
  ]);

  // Heroku (--buildpack https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt.git)
  grunt.registerTask('heroku', [
    'verify'
  ]);
};
