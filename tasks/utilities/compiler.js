var fs = require('fs');
var grunt = require('grunt');
var nunjucks = require('nunjucks');

(function(){
	'use strict';

	// Loads templates from the 'guide' directory
	var env = new nunjucks.Environment([
        new nunjucks.FileSystemLoader('guide')
    ]);

	function getTemplate (path) {
        return env.getTemplate(path);
    }

	function isNotUnderscored (str) {
        return !(str.substring(0,1).match(/_/g));
    }

	module.exports = {
		getTemplate: getTemplate,
		isNotUnderscored: isNotUnderscored,
	}
}());
