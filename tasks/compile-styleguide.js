var fs 			= require('fs');
var grunt 		= require('grunt');
var marked  	= require('marked');
var nunjucks 	= require('nunjucks');		

module.exports = function (grunt) {
	'use strict';

	var env = new nunjucks.Environment([
        new nunjucks.FileSystemLoader('guide')
    ]);
	var styleGuideDirectory = 'style-guide/';
	var pagesDirectory = 'pages/';
	var file = grunt.file;
	var webRoot = './';

	function getTemplate (path) {
        return env.getTemplate(path);
    }

	var template = getTemplate('/_style-guide/_style-guide.html');
	var html = template.render({
		'name': 'Front-end Guide',
		'webRoot': webRoot,
		'pathToAssets': '/static/',
		'pathToGuide': webRoot + 'guide/',
	});

	grunt.file.write(pagesDirectory + styleGuideDirectory + '/index.html', html);

};