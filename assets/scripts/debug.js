(function(){
	'use strict';

	var components = document.querySelectorAll('[data-component]');

	annotateComponents();

	if(window.location.href.indexOf('debug') > 0){ toggleDebug(); }
	window.debug = toggleDebug;

	function annotateComponents() {
		[].forEach.call([].slice.call(components), function(component){
			var name = component.getAttribute('data-component');
			var label = document.createElement('a');
			label.innerHTML = name;
			label.href = '/modules/components/' + name + '/preview.html';
			helpers.dom.addClass(label, 'debug-label');
			component.appendChild(label);
		});
	}

	function toggleDebug() {
		[].forEach.call([].slice.call(components), function(component){
			helpers.dom.toggleClass(component, 'debug-component');
		});
	}
}());