
//blockDirtyForm
(function($) {
	$.fn.extend({
		blockDirtyForm: function(options) {
			var defaults = {
				forceBlockDirtyForm: false
			}
			var options = $.extend(defaults, options);
			

			return this.each(function() {
				//location of code found for handling dirty form, http://cfsilence.com/blog/client/index.cfm/2009/10/12/jQuery-Method-To-Prompt-A-User-To-Save-Changes-Before-Leaving-Page#postUpdate

				var isDirty = false;
				if (options.forceBlockDirtyForm) isDirty = true;

				var msg = 'You haven\'t saved your changes.';

				$(':input').change(function() {
					if (!isDirty) {
						isDirty = true;
					}
				});

				window.onbeforeunload = function() {
					if (isDirty) {
						return msg;
					}
				};
			});
		}
	});
})(jQuery);