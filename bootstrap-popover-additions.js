// Released under the MIT License
// Copyright (c) 2013 Silviu Bogan
// 
// Provides additional jQuery methods related to Bootstrap 3 popovers.
// GitHub: https://github.com/silviubogan/bootstrap-popover-additions

(function ($) {
	// In some situations, on manual hide, Bootstrap 3 only sets popover's tip's opacity to 0.
	// As a walkaround to this bug, the following code forces a complete hide.
	$.fn.popoverForceHide = function () {
	    var popover  = $(this).data("bs.popover");
	    popover.leave(popover);
	};

	// Returns the jQuery instance of the popover's tip.
	$.fn.popoverTip = function () {
		return $(this).data("bs.popover").tip();
	};

	// This function forces a refresh of the popover's tip's position.
	// It is useful sometimes, after dinamically changing the contents of the popover.
	// It contains modified code from Bootstrap 3.
	$.fn.refreshPopoverPosition = function () {
		var popover = this.data('bs.popover');
		var $tip = this.popoverTip();

		var pos = popover.getPosition();
		var actualWidth  = $tip[0].offsetWidth;
		var actualHeight = $tip[0].offsetHeight;

		// works only with a placement option of type string
		var placement = popover.options.placement;

		var calculatedOffset = popover.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
		popover.applyPlacement(calculatedOffset, placement);
	};

	// Sets up a click event listener on the document, so that only one popover from those triggered by
	// the elements matching the popoverLinkSelector selector will be shown at the same time.
	$.mutuallyExclusiveBootstrapPopovers = function (popoverLinkSelector) {
		$(document).on('click', function (e) {
		    var $popovers = $(".popover");
		    $(popoverLinkSelector).each(function () {
		        var $popoverLink = $(this),
		            clickedElement = e.target;
		        if (!$popoverLink.is(clickedElement) && $popoverLink.has(clickedElement).length === 0 &&
		                !$popovers.is(clickedElement) && $popovers.has(clickedElement).length === 0) {
		            $popoverLink.popoverForceHide();
		        }
		    });
		});
	};
})(jQuery);