//word count plugin
   (function($) {
   	$.fn.extend({
   		wordCount: function(options) {
   			var defaults = {
   				maxWords: 10,
   				warningPercentTrigger: .8,
   				maxWordAttribute: null //if this is not null, the plugin will search the input control for an attribute to pull the max value from
   			}
   			var options = $.extend(defaults, options);

   			var doWordCount = function(txtBox) {
   				
   				var thisMaxWords = options.maxWords;
   				if (options.maxWordAttribute != null) {
   					var newMax = $(txtBox).attr(options.maxWordAttribute);
   					if (newMax != null) thisMaxWords = newMax;
   				}
   			
   				var warnWordCount = parseInt(thisMaxWords * options.warningPercentTrigger);
   				var currText = $(txtBox).val();
   				var numWords = 0;
   				var matches = currText.match(/[\S]+/g);
   				if (currText.length > 0) numWords = matches ? matches.length : 0;

   				var hasWordCount = $(txtBox).nextAll('div.wordcount_plgin').get(0);
   				if (hasWordCount != null) {
   					$(hasWordCount).html("Current Word Count [ " + numWords + " ] (max: " + thisMaxWords + ")");

   					if (numWords >= warnWordCount && numWords <= thisMaxWords) {
   						if ($(hasWordCount).hasClass('wordsover')) $(hasWordCount).toggleClass('wordsover');
   						if (!$(hasWordCount).hasClass('wordswarn')) $(hasWordCount).toggleClass('wordswarn');
   					}
   					else if (numWords > thisMaxWords) {
   						if (!$(hasWordCount).hasClass('wordsover')) $(hasWordCount).toggleClass('wordsover');
   						if ($(hasWordCount).hasClass('wordswarn')) $(hasWordCount).toggleClass('wordswarn');
   					}
   					else {
   						if ($(hasWordCount).hasClass('wordsover')) $(hasWordCount).toggleClass('wordsover');
   						if ($(hasWordCount).hasClass('wordswarn')) $(hasWordCount).toggleClass('wordswarn');
   					}
   				}
   			}

   			return this.each(function() {

   				$(this).after('<div class="wordcount_plgin">Current Word Count [ ] (max: N/A)</div>');
   				doWordCount(this);

   				$(this).keyup(function() { doWordCount(this); });
   				$(this).blur(function () { doWordCount(this); });
   			});
   		}
   	});
   })(jQuery);
