(function(d, w){
	'use strict';

	var introComponentElm = d.querySelector('[data-component="detail-intro"]');
	if (!introComponentElm) {
		return;
	}
	var introTextElm = introComponentElm.querySelector('[data-intro-text]');
	var widgetScoreElm = introComponentElm.querySelector('[data-component="widget-score"]');
	var introSectionElm = introComponentElm.querySelector('[data-intro-section]');
	var socialButtonsElm = introComponentElm.querySelector('[data-social-buttons]');

	// Make the widget height equal to the height of introTextElm
	function equalizeHeight() {
		if (helpers.breakSize !== 'extra-small') {
			introSectionElm.style.height = widgetScoreElm.style.height = (introTextElm.offsetHeight + socialButtonsElm.offsetHeight) + 'px';
			socialButtonsElm.style.marginTop = -(socialButtonsElm.offsetHeight) + 'px';
		} else {
			socialButtonsElm.style.marginTop = introSectionElm.style.height = widgetScoreElm.style.height = '';
		}
	}

	// Fire equalizeHeight debounced on the resize event
	w.addEventListener('resize', debounce(equalizeHeight, 250), false);

	// Make sure all images inside introTextElm are loaded
	w.addEventListener('load', equalizeHeight, false);
}(document, window));