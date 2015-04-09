var compiler    = require('./utilities/compiler');
var marked  	= require('marked');	

module.exports = function (grunt) {
	'use strict';

	var styleGuideDirectory = 'style-guide/';
	var pagesDirectory = 'pages/';
	var file = grunt.file;
	var webRoot = './';

	var template = compiler.getTemplate('/_style-guide/_style-guide.html');
	var html = template.render({
		'name': 'Front-end Guide',
		'webRoot': webRoot,
		'pathToAssets': '/static/',
		'pathToGuide': webRoot + 'guide/',
	});

	grunt.file.write(pagesDirectory + styleGuideDirectory + '/index.html', html);

};