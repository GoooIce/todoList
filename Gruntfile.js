/*global module:false*/
var path           = require('path');
var escapeChar     = process.platform.match(/^win/) ? '^' : '\\';
var cwd            = process.cwd().replace(/( |\(|\))/g, escapeChar + '$1');

module.exports = function (grunt, starter) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    // ### grunt-shell
    // Command line tools where it's easier to run a command directly than configure a grunt plugin
    shell: {
      // #### Run bower install
      // Used as part of `grunt init`. See the section on [Building Assets](#building%20assets) for more
      // information.
      bower: {
        command: path.resolve(cwd + '/node_modules/.bin/bower --allow-root install'),
        options: {
          stdout: true
        }
      }
    },


    // ### grunt-contrib-copy
    // Copy files into their correct locations as part of building assets, or creating release zips
    copy: {
      main:{
        files: [{
          cwd: 'bower_components/bootstrap/dist/',
          src: ['**'],
          dest: 'todoList/',
          expand: true
        }, {
          cwd: 'bower_components/ember/',
          src: 'ember.js',
          dest: 'todoList/js/',
          expand: true
        }, {
          cwd: 'bower_components/ember-data/',
          src: 'ember-data.js',
          dest: 'todoList/js/',
          expand: true
        }, {
          cwd: 'bower_components/handlebars/',
          src: 'handlebars.js',
          dest: 'todoList/js/',
          expand: true
        }, {
          cwd: 'bower_components/jquery/dist/',
          src: 'jquery.js',
          dest: 'todoList/js/',
          expand: true
        }, {
          cwd: 'bower_components/moment/min/',
          src: 'moment-with-langs.min.js',
          dest: 'todoList/js/',
          expand: true
        }, {
          cwd: 'bower_components/loader.js/',
          src: 'loader.js',
          dest: 'todoList/js/',
          expand: true
        }, {
          cwd: 'bower_components/ember-resolver/dist/',
          src: 'ember-resolver.js',
          dest: 'todoList/js/',
          expand: true
        }, {
          cwd: 'bower_components/ember-load-initializers/',
          src: 'ember-load-initializers.js',
          dest: 'todoList/js/',
          expand: true
        }]
      }
    },

    // ### grunt-es6-module-transpiler
    // Compiles Ember es6 modules
    transpile: {
      todo: {
        type: 'amd',
        moduleName: function (path) {
          return 'todoList/' + path;
        },
        files: [{
          expand: true,
          cwd: 'todoList/js/app/',
          src: ['**/*.js'],
          dest: '.tmp/ember-transpiled/'
        }]
      }
    },

    // ### grunt-ember-templates
    // Compiles handlebar templates for ember
    emberTemplates: {
      prod: {
        options: {
          templateBasePath: /todoList/,
          templateFileExtensions: /\.hbs/,
          templateRegistration: function (name, template) {
            return grunt.config.process('define(\'') +
              name + '\', [\'exports\'], function(__exports__){ __exports__[\'default\'] = ' +
              template + '; });';
          }
        },
        files: {
          'todoList/js/templates-dev.js': 'todoList/templates/**/*.hbs'
        }
      },

      dev: {
        options: {
          templateBasePath: /todoList/,
          templateFileExtensions: /\.hbs/,
          templateName: function(sourceFile) {
            var newSource = sourceFile.replace('templates/', '');
            return newSource.replace('.hbs', '');
          }
        },
        files: {
          'todoList/js/templates.js': 'todoList/templates/**/*.hbs'
        }
      }
    },

    // ### grunt-contrib-watch
    // Compiles handlebar templates for ember with watch
    watch: {
      options: {
        spawn: false,
        // Once you've started a live reload server you'll be able to access the live reload script.
        // To enable live reload on your page, add a script tag before your closing </body> tag pointing to the livereload.js script:
        // <script src="//localhost:35729/livereload.js"></script> [or] Using Live Reload with the Browser Extension
        livereload: true
      },
      sources: {
        files: ['todoList/templates/**/*.hbs', 'todoList/js/**/*.js'],
        tasks: ['dev']
      }
    },

    // ### grunt-contrib-concat
    // concatenate multiple JS files into a single file ready for use
    concat: {
      dist: {
        src : [
         // 'todoList/js/jquery.js',
         // 'todoList/js/handlebars.js',
         // 'todoList/js/ember.js',
         'todoList/js/loader.js',
         'todoList/js/ember-resolver.js',
          'todoList/js/ember-load-initializers.js',
          '.tmp/ember-transpiled/**/*.js',
          'todoList/js/templates.js'
        ],
        dest: 'todoList/js/dist/dest.js'
      }
    },

    // ### grunt-contrib-clean
    // Clean up files as part of other tasks
    clean: {
      built: {
        src: ['todoList/js/dist/*','todoList/js/templates*.js', '.tmp/ember-transpiled',]
      },
      tmp: {
        src: ['.tmp/**']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-es6-module-transpiler');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('init','Prepare the project for development', ['shell:bower','copy']);
  grunt.registerTask('dev', 'developer go~', ['clean:built','emberTemplates:dev', 'transpile:todo', 'concat:dist']);
  grunt.registerTask('local', 'watch and go',['dev', 'watch']);
};
