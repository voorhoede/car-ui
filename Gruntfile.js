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
 
  require('load-grunt-config')(grunt);

  // NEVER REMOVE THESE LINES, OR ELSE YOUR PROJECT MAY NOT WORK
  require('./options/generatorOptions.js')(grunt);
  grunt.loadTasks('tasks');

  // load multiple grunt tasks at once
  require('load-grunt-tasks')(grunt);

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
