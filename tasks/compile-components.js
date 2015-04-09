var compiler    = require('./utilities/compiler');
var fs 			= require('fs');
var grunt 		= require('grunt');
var marked  	= require('marked');
var nunjucks 	= require('nunjucks');		

module.exports = function (grunt) {
	'use strict';

	var componentsDirectory = 'components/';
	var pagesDirectory = 'pages/';
	var file = grunt.file;

	function getComponents () {
        return fs.readdirSync(componentsDirectory)
	        .filter(compiler.isNotUnderscored)
	        .filter(function(name){
	            return grunt.file.isDir(componentsDirectory + name);
	    });
    }

	var previewer = compiler.getTemplate(
			'../guide/_component-previewer/component-previewer.html');

	function compilePreview (name) {

		var webRoot = '../../../';

		var htmlFilename = componentsDirectory + name + '/_' + name + '.html';
		var html = file.exists(htmlFilename) ? file.read(htmlFilename) : '';

		var cssFilename = componentsDirectory + name + '/_' + name + '.scss';
		var css = file.exists(cssFilename) ? file.read(cssFilename) : '';

		var jsFilename = componentsDirectory + name + '/_' + name + '.js';
		var js = file.exists(jsFilename) ? file.read(jsFilename) : '';

		var readmeFilename = componentsDirectory + name + 'README.md';
		var readme = file.exists(readmeFilename) ? file.read(readmeFilename) : '';
		readme = marked(readme)
			.replace(/<code>/g, '<code class="language-unknown">'); // triggers primsjs css

		var previewerHtml = previewer.render({
			'name': name,
			'webRoot': webRoot,
			'pathToAssets': '/static/',
            'components': getComponents(),
			'code': {
				'html': html,
				'css': css,
				'js': js,
				'readme': readme
			}
		})
		file.write(pagesDirectory + componentsDirectory + name +  '/index.html', previewerHtml);
	}

	getComponents().forEach(compilePreview);
};
