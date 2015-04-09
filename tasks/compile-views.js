/**
* Compile preview page for each view in the templates directory
*/

var compiler    = require('./utilities/compiler');
var fs 			= require('fs');
var grunt 		= require('grunt');
var marked  	= require('marked');
var nunjucks 	= require('nunjucks');

module.exports = function (grunt) {
	'use strict';

	// Loads templates from the 'guide' directory
	var templatesDirectory = 'templates/';
	var pagesDirectory = 'pages/';
	var file = grunt.file;

	function getViews () {
		// returns an array of filenames excluding '.' and '..'.
        return fs.readdirSync(templatesDirectory)
            .filter(compiler.isNotUnderscored)
            .filter(function(name){
            	// join all arguments together and normalize the resulting path.
                return grunt.file.isDir(templatesDirectory + name);
            });
    }

	var previewer = compiler.getTemplate(
			'../guide/_component-previewer/component-previewer-object.html');

	function compilePreview(name) {
		var htmlFilename = templatesDirectory + name + '/' + name + '.html';
		var listHtmlFileName = templatesDirectory + name + '/' + 'list.html';
		var individualHtmlFileName = templatesDirectory + name + '/' + 'individual.html';

		var html = file.exists(htmlFilename) ? file.read(htmlFilename) : '';
		var listHtml = file.exists(listHtmlFileName) ? file.read(listHtmlFileName) : '';
		var individualHtml = file.exists(individualHtmlFileName) ? file.read(individualHtmlFileName) : '';

		if(file.exists(listHtmlFileName)){
			var previewerHtml = previewer.render({
				'name': name,
				'pathToAssets': '/static/',
	            'views': getViews(),
				'code': {
					'html': listHtml
				}
			})
			file.write(pagesDirectory + 'views/' + name +  '/index.html', previewerHtml);
		}
		if(file.exists(individualHtmlFileName)){
			var previewerHtml = previewer.render({
				'name': name,
				'pathToAssets': '/static/',
	            'views': getViews(),
				'code': {
					'html': individualHtml
				}
			})
			file.write(pagesDirectory + 'views/' + 'individual-review/' + '/index.html', previewerHtml);
		}
		if(file.exists(htmlFilename)) {
			var previewerHtml = previewer.render({
				'name': name,
				'pathToAssets': '/static/',
	            'views': getViews(),
				'code': {
					'html': html
				}
			})
			file.write(pagesDirectory + 'views/' + name +  '/index.html', previewerHtml);
		}
	}

	getViews().forEach(compilePreview);
};