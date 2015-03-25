/**
 * Collection of global helpers
 * @type {object} helpers
 */
var helpers = helpers || {};

(function(){
	'use strict';

	/**
	 * Collection of DOM helpers
	 * @type {object} helpers.dom
	 */
	helpers.dom = helpers.dom || {};

	/**
	 * containsClass
	 * Borrowed from: http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/
	 * @param {HTMLElement} element
	 * @param {String} className
	 */
	function containsClass (element, className) {
		if (document.documentElement.classList) {
			return element.classList.contains(className);
		} else {
			var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
			return element.className.match(re);
		}
	}
	helpers.dom.containsClass = containsClass;

	/**
	 * Borrowed from: http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/
	 * @param {HtmlElement} element
	 * @param {String} className
	 */
	function addClass (element, className) {
		if (document.documentElement.classList) {
			element.classList.add(className);
		} else {
			if (!containsClass(element, className)) {
				element.className += (element.className ? ' ' : '') + className;
			}
		}
	}
	helpers.dom.addClass = addClass;

	/**
	 * Borrowed from: http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/
	 * @param {HtmlElement} element
	 * @param {String} className
	 */
	function removeClass (element, className) {
		if (document.documentElement.classList) {
			element.classList.remove(className);
		} else {
			var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
			element.className = element.className.replace(regexp, '$2');
		}
	}
	helpers.dom.removeClass = removeClass;

	/**
	 * Borrowed from: http://hacks.mozilla.org/2010/01/classlist-in-firefox-3-6/
	 * @param {HtmlElement} element
	 * @param {String} className
	 */
	function toggleClass (element, className){
		if (document.documentElement.classList) {
			return element.classList.toggle(className);
		} else {
			if (containsClass(element, className))
			{
				removeClass(element, className);
				return false;
			} else {
				addClass(element, className);
				return true;
			}
		}
	}
	helpers.dom.toggleClass = toggleClass;

}());