var compiler    = require('./utilities/compiler');
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
	var webRoot = './'

	var template = compiler.getTemplate('/front-end-guide/front-end-guide.html');
	var html = template.render({
		'name': 'Front-end Guide',
		'pathToAssets': '/static/',
		'pathToGuide': webRoot + 'guide/',
		'components': compiler.getComponents(),
		'views': compiler.getViews(),
		'compiledViews': compiler.getCompiledViews()
	});

	grunt.file.write(pagesDirectory + guideDirectory + '/index.html', html);

};
