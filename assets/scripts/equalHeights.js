(function(d, w) {
	'use strict';

	function equalizeHeight() {
		var equalHeightElements = d.querySelectorAll('[data-equal-height]');
		if (equalHeightElements.length) {
			var height = 0;

			[].forEach.call([].slice.call(equalHeightElements), function(element) {
				if (helpers.breakSize !== 'extra-small') {
					var oldHeight = element.offsetHeight; // Store old height for transition

					element.style.height = ''; // Remove any inline height
					if (element.offsetHeight > height) {
						height = element.offsetHeight;
					}

					element.style.height = oldHeight + 'px'; // Re-set the old height for the transition
				} else {
					height = '';
				}
			});

			[].forEach.call([].slice.call(equalHeightElements), function(element) {
				if (height) {
					element.style.height = height + 'px';
				} else {
					element.style.height = '';
				}
			});
		}
	}

	w.addEventListener('load', equalizeHeight, false);
	w.addEventListener('resize', debounce(equalizeHeight, 250), false);

}(document, window));