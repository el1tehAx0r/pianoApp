//char count plugin
//Note: This function is used by plain text areas.  The rich text editor uses the function in Scripts\ckeditor\plugins\charcount\plugin.js.
   (function($) {
   	$.fn.extend({
   		charCount: function(options) {
   			var defaults = {
   				maxChars: 2500,
   				warningPercentTrigger: .8,
   				maxCharAttribute: null //if this is not null, the plugin will search the input control for an attribute to pull the max value from
   			};
				options = $.extend(defaults, options);
				var doCharCount = function(txtBox) {

			   	var thisMaxChars = options.maxChars;
   				if (options.maxCharAttribute != null) {
   					var newMax = $(txtBox).attr(options.maxCharAttribute);
   					if (newMax != null) thisMaxChars = newMax;
   				}
   			
   				var warnCharCount = parseInt(thisMaxChars * options.warningPercentTrigger);
   				var currText = $(txtBox).val();
   				var numChars = currText.length;
				
   				var hasCharCount = $(txtBox).nextAll('div.charcount_plgin').get(0);
   				if (hasCharCount != null) {
   					$(hasCharCount).html("Current Character Count [ " + numChars + " ] (max: " + thisMaxChars + ")");

   					if (numChars >= warnCharCount && numChars <= thisMaxChars) {
   						if ($(hasCharCount).hasClass('charsover')) $(hasCharCount).toggleClass('charsover');
   						if (!$(hasCharCount).hasClass('charswarn')) $(hasCharCount).toggleClass('charswarn');
   					}
   					else if (numChars > thisMaxChars) {
   						if (!$(hasCharCount).hasClass('charsover')) $(hasCharCount).toggleClass('charsover');
   						if ($(hasCharCount).hasClass('charswarn')) $(hasCharCount).toggleClass('charswarn');
   					}
   					else {
   						if ($(hasCharCount).hasClass('charsover')) $(hasCharCount).toggleClass('charsover');
   						if ($(hasCharCount).hasClass('charswarn')) $(hasCharCount).toggleClass('charswarn');
   					}
   				}
   			};
   			return this.each(function() {

   				$(this).after('<div class="charcount_plgin">Current Character Count [ ] (max: N/A)</div>');
   				doCharCount(this);

   				$(this).keyup(function() { doCharCount(this); });
   				$(this).blur(function () { doCharCount(this); });
   			});
   		}
   	});
   })(jQuery);
