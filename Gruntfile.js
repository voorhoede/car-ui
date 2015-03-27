'use strict';
module.exports = function(grunt) {

  // ----------------------------------------------------------
  // WARNING, BRAVE DEVELOPER
  // ----------------------------------------------------------
  // Webhook allows you to use local grunt tasks and files.
  // However, these tasks are ONLY RUN LOCALLY and not when
  // your live site needs to be rebuilt. This means you should
  // only use grunt for pre-processing tasks like building
  // Sass, less or coffescript files, not for reading things
  // from your templates and making dynamic changes during
  // the build process. Doing so will cause your live site
  // not to regenerate.
  //
  // You have been warned!
  grunt.initConfig({
    grunticon: {
      foo: {
        files: [
          {
            expand: true,
            cwd: 'assets/images/grunticon-svgs',
            src: ['*.svg', '*.png'],
            dest: 'static/images/grunticon-output'
          }
        ],
        options: {
          customselectors: {
            'left-red' : ['.icon-left:hover', '.icon-left:focus'],
            'facebook-yellow-white': ['.icon-facebook:hover', '.icon-facebook:focus'],
            'gplus-yellow-white': ['.icon-gplus:hover', '.icon-gplus:focus'],
            'twitter-yellow-white': ['.icon-twitter:hover', '.icon-twitter:focus']
          },
          prefix: {
            prefix: '.icon-'
          },
          colors: {
            red: '#CD4D4D',
            yellow: '#fee165'
          },
          defaultWidth: '30px',
          defaultHeight: '30px'
        }
      }
    },
    sass: {
      foo: {
        files: [
          {
            expand: true,
            cwd: 'assets/scss',
            src: ['main.scss'],
            dest: 'static/css',
            ext: '.css'
          }
        ]
      }
    },
    concat: {
      basic: {
        src: ['assets/scripts/helpers/*.js', 'assets/scripts/*.js', 'components/**/*.js', 'templates/**/*.js'],
        dest: 'static/javascript/main.js'
      }
    }
  });

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default',  'Clean, Build, Start Local Server, and Watch', function() {
    grunt.task.run('grunticon');
    grunt.task.run('sass');
    grunt.task.run('concat');
    grunt.task.run('configureProxies:wh-server');
    grunt.task.run('connect:wh-server');
    grunt.task.run('build');
    grunt.task.run('concurrent:wh-concurrent');
  });

};
