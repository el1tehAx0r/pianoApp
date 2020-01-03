//Author: Elva Lester
//Notes:  I shamelessly copied the logic from Mike's wordcount jQueryPlugin
//        In order for this feature to work, you add both the wordcount class and richEditor class to your textarea
CKEDITOR.plugins.add("wordcount", {
	init: function (editor) {
		var pluginName = "wordcount";

		// Register the command
		var command = editor.addCommand(pluginName, CKEDITOR.plugins.wordcount);
		// Execute the first count
		editor.on("instanceReady", function (event) {
			editor.execCommand(pluginName);
		});

		editor.on("contentDom", function () {  //traps keyup events so wordcount is accurate
			var editable = editor.editable();

			editable.attachListener( editor.document, 'keyup', function() {
				editor.execCommand(pluginName);
			} );
		} );

		editor.on("key", function (event) {
			editor.execCommand(pluginName);
		});
		editor.on("blur", function (event) {
			editor.execCommand(pluginName);
		});
		editor.on("setData", function (event) {
			editor.execCommand(pluginName);
		});
		editor.on("saveSnapshot", function (event) {	//used to trap paste events
			editor.execCommand(pluginName);
		});
		editor.getCommand("undo").on("afterUndo", function (event) {
			editor.execCommand(pluginName);
		});
		editor.getCommand("redo").on("afterRedo", function (event) {
			editor.execCommand(pluginName);
		});
	}
});

CKEDITOR.plugins.wordcount = {
	exec: function (editor) {
		var textWithMarkup = editor.getData();
		var text = textWithMarkup.replace(/<[^<|>]+?>| /gi, " "); //get rid of HTML markup
		text = text.replace(/\n/gi, ""); //get rid of new lines
		text = text.replace(/\r/gi, ""); //get rid of carriage returns
		text = text.replace(/\t/gi, ""); //get rid of tabs
		//replace encoded html
		text = text.replace(/&#39;/gi, "'"); //apostrophes
		text = text.replace(/&quot;/gi, '"'); //quotes
		text = text.replace(/&amp;/gi, "&"); //ampersands
		text = text.replace(/&lt;/gi, "<"); //less than
		text = text.replace(/&gt;/gi, ">"); // greater than
		text = text.replace(/&nbsp;/gi, " ");  //spaces

		//CKEditor plugin Equation Editor renders functions as images
		//We need to count each of these images as 1 word
		var equationWords = 0;
		var equationSeparator = "latex.codecogs.com/gif.latex";
		var equations = textWithMarkup.split(equationSeparator);
		var endParms = "/>";
		for (var i = 0; i < equations.length; i++)
		{
			var end = equations[i].indexOf(endParms);
			if (end > 0 && equations[i].indexOf("?") == 0) //parameters start with ? and end with />
			{
			    equationWords += 1;
			}
		}
		var selector = "#" + editor.element.getId();
		var maxWords = $(selector).attr("data-maxWords");

		var warnWordCount = parseInt(maxWords * .8); //trigger warning at 80%
		var numWords = 0;
		var matches = text.match(/[\S]+/g);
		if (text.length > 0) numWords = matches ? matches.length : 0;
	    numWords += equationWords;

		var hasWordCount = $(selector).nextAll("div.wordcount_plgin").get(0);
		if (hasWordCount != null) {
			$(hasWordCount).html("Current Word Count [ " + numWords + " ] (max: " + maxWords + ")");

			if (numWords >= warnWordCount && numWords <= maxWords) {
				if ($(hasWordCount).hasClass("wordsover")) $(hasWordCount).toggleClass("wordsover");
				if (!$(hasWordCount).hasClass("wordswarn")) $(hasWordCount).toggleClass("wordswarn");
			}
			else if (numWords > maxWords) {
				if (!$(hasWordCount).hasClass("wordsover")) $(hasWordCount).toggleClass("wordsover");
				if ($(hasWordCount).hasClass("wordswarn")) $(hasWordCount).toggleClass("wordswarn");
			}
			else {
				if ($(hasWordCount).hasClass("wordsover")) $(hasWordCount).toggleClass("wordsover");
				if ($(hasWordCount).hasClass("wordswarn")) $(hasWordCount).toggleClass("wordswarn");
			}
		}

		if (editor.checkDirty())
			editor.fire($(selector).change());
	},
	editorFocus : false			// command does not require focusing on the editing document
};