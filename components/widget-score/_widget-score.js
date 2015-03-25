(function(d){
	'use strict';

	var toggleClass = helpers.dom.toggleClass;
	var widgetElms = d.querySelectorAll('[data-component="widget-score"]');

	[].forEach.call([].slice.call(widgetElms), function (widgetElm) {
		var headerElm = widgetElm.querySelector('[data-widget-score-overview]');
		var headerArrow = widgetElm.querySelector('[data-score-header-arrow]');
		headerElm.addEventListener('click', function() {

			var anchors = this.querySelectorAll('a');
			[].forEach.call([].slice.call(anchors), function(anchor) {
				if (anchor.getAttribute('tabindex') === '-1') {
					anchor.setAttribute('tabindex', '0');
				} else {
					anchor.setAttribute('tabindex', '-1');
				}
			});

			toggleClass(this, 'expanded');
			toggleClass(headerArrow, 'icon-arrow-down');
			toggleClass(headerArrow, 'icon-arrow-up');
		});
	});

}(document));