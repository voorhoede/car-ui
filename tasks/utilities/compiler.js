var fs = require('fs');
var grunt = require('grunt');
var nunjucks = require('nunjucks');

(function(){
	'use strict';

	// Loads templates from the 'guide' directory
	var env = new nunjucks.Environment([
        new nunjucks.FileSystemLoader('guide')
    ]);
    var templatesDirectory = 'templates/';
    var viewsDirectory = 'pages/views/';
    var componentsDirectory = 'guide/components/';

	function getTemplate (path) {
        return env.getTemplate(path);
    }

	function isNotUnderscored (str) {
        return !(str.substring(0,1).match(/_/g));
    }

    function getViews () {
		// returns an array of filenames excluding '.' and '..'.
        return fs.readdirSync(templatesDirectory)
            .filter(isNotUnderscored)
            .filter(function(name){
            	// join all arguments together and normalize the resulting path.
                return grunt.file.isDir(templatesDirectory + name);
            });
    }

	function getComponents () {
        return fs.readdirSync(componentsDirectory)
	        .filter(isNotUnderscored)
	        .filter(function(name){
	            return grunt.file.isDir(componentsDirectory + name);
	    });
    }

    function getCompiledViews () {
        return fs.readdirSync(viewsDirectory)
            .filter(isNotUnderscored)
            .filter(function(name){
                return grunt.file.isDir(viewsDirectory + name);
        });
    }

	module.exports = {
		getTemplate: getTemplate,
		isNotUnderscored: isNotUnderscored,
		getViews: getViews,
		getComponents: getComponents,
        getCompiledViews: getCompiledViews
	}
}());
