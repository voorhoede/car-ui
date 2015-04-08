var fs 			= require('fs');
var grunt 		= require('grunt');
var marked  	= require('marked');
var nunjucks 	= require('nunjucks');		

module.exports = function (grunt) {
	'use strict';

	var env = new nunjucks.Environment([
        new nunjucks.FileSystemLoader('guide')
    ]);
	var viewsDirectory = 'templates/';
	var pagesDirectory = 'pages/';
	var file = grunt.file;

	function getTemplate (path) {
        return env.getTemplate(path);
    }

	function isNotUnderscored (str) {
        return !(str.substring(0,1).match(/_/g));
    }

	function getViews () {
        return fs.readdirSync(viewsDirectory)
            .filter(isNotUnderscored)
            .filter(function(name){
                return grunt.file.isDir(viewsDirectory + name);
            });
    }

	var previewer = getTemplate(
			'../guide/_component-previewer/component-previewer-object.html');

	function compilePreview (name) {

		var webRoot = '../../../';

		var htmlFilename = viewsDirectory + name + '/' + name + '.html';
		var listHtmlFileName = viewsDirectory + name + '/' + 'list.html';
		var individualHtmlFileName = viewsDirectory + name + '/' + 'individual.html';

		var html = file.exists(htmlFilename) ? file.read(htmlFilename) : '';
		var listHtml = file.exists(listHtmlFileName) ? file.read(listHtmlFileName) : '';
		var individualHtml = file.exists(individualHtmlFileName) ? file.read(individualHtmlFileName) : '';

		if(file.exists(listHtmlFileName)){
			var previewerHtml = previewer.render({
				'name': name,
				'webRoot': webRoot,
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
				'webRoot': webRoot,
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
				'webRoot': webRoot,
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
