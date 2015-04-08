var fs 			= require('fs');
var grunt 		= require('grunt');
var marked  	= require('marked');
var nunjucks 	= require('nunjucks');		

module.exports = function (grunt) {
	'use strict';

	var env = new nunjucks.Environment([
        new nunjucks.FileSystemLoader('guide')
    ]);
    var componentsDirectory = 'components/';
    var viewsDirectory = 'pages/views/';
	var guideDirectory = 'front-end-guide/';
	var pagesDirectory = 'pages/';
	var file = grunt.file;
	var webRoot = './';

	function getTemplate (path) {
        return env.getTemplate(path);
    }

	function isNotUnderscored (str) {
        return !(str.substring(0,1).match(/_/g));
    }

	function getComponents () {
        return fs.readdirSync(componentsDirectory)
	        .filter(isNotUnderscored)
	        .filter(function(name){
	            return grunt.file.isDir(componentsDirectory + name);
	    });
    }

    function getViews () {
        return fs.readdirSync(viewsDirectory)
            .filter(isNotUnderscored)
            .filter(function(name){
                return grunt.file.isDir(viewsDirectory + name);
            });
    }

    console.log(getViews());

	var template = getTemplate('/front-end-guide/front-end-guide.html');
	var html = template.render({
		'name': 'Front-end Guide',
		// 'project': project,
		'webRoot': webRoot,
		'pathToAssets': '/static/',
		// 'hrefPrefix': compiler.hrefPrefix,
		'pathToGuide': webRoot + 'guide/',
		'components': getComponents(),
		'views': getViews()
	});

	grunt.file.write(pagesDirectory + guideDirectory + '/index.html', html);

};
