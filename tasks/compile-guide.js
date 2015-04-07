var fs 			= require('fs');
var grunt 		= require('grunt');
var marked  	= require('marked');
var nunjucks 	= require('nunjucks');		

module.exports = function (grunt) {
	'use strict';

	var env = new nunjucks.Environment([
        new nunjucks.FileSystemLoader('templates')
    ]);
    var componentsDirectory = 'components/';
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

	var template = getTemplate('../templates/front-end-guide/front-end-guide.html');
	var html = template.render({
		'name': 'Front-end Guide',
		// 'project': project,
		'webRoot': webRoot,
		'pathToAssets': '/static/',
		// 'hrefPrefix': compiler.hrefPrefix,
		'pathToGuide': webRoot + 'guide/',
		'components': getComponents()
		// 'views': compiler.getViews(),
	});

	grunt.file.write(pagesDirectory + guideDirectory + '/index.html', html);

};
