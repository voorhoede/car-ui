var helpers = helpers || {};

(function(d, w){
	'use strict';

	function setBreakSize() {
		// Set breakSize globally - Removing doubles quotes added by IE
		helpers.breakSize = w.getComputedStyle(d.body, ':after').getPropertyValue('content').replace(/"/g, '');
	}
	setBreakSize();

	w.addEventListener('resize', debounce(setBreakSize, 250), false);
}(document, window));