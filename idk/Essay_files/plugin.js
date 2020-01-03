//Author: Elva Lester
//Notes:  I shamelessly copied the logic from Mike's wordcount jQueryPlugin
//        In order for this feature to work, you add both the charcount class and richEditor class to your textarea
//        This function is used by rich text editor text areas.  The plain text area uses the function in ORAU.CharCountPlugin.js.

CKEDITOR.plugins.add("charcount", {
	init: function (editor) {
		var pluginName = "charcount";

		// Register the command
		var command = editor.addCommand(pluginName, CKEDITOR.plugins.charcount);
		// Execute the first count
		editor.on("instanceReady", function (event) {
			editor.execCommand(pluginName);
		});

		editor.on("contentDom", function () {  //traps keyup events so charcount is accurate
			var editable = editor.editable();

			editable.attachListener(editor.document, 'keyup', function () {
				editor.execCommand(pluginName);
			});
		});

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

CKEDITOR.plugins.charcount = {
	exec: function (editor) {
		var textWithMarkup = editor.getData();
		var text = textWithMarkup.replace(/<[^<|>]+?>|/gi, ""); //get rid of HTML markup
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
		//We need to count each character which appears in img tag separated by percent (%) signs
		var equationChars = 0;
		var equationSeparator = "latex.codecogs.com/gif.latex";
		var equations = textWithMarkup.split(equationSeparator);
		var endParms = "/>";
		for (var i = 0; i < equations.length; i++)
		{
			var end = equations[i].indexOf(endParms);
			if (end > 0 && equations[i].indexOf("?") == 0) //parameters start with ? and end with />
			{
				var parms = equations[i].substring(0, end);
				equationChars += parms.split("%").length - 1;
			}
		}

		var selector = "#" + editor.element.getId();
		var maxChars = $(selector).attr("data-maxChars");

		var warnCharCount = parseInt(maxChars * .8); //trigger warning at 80%
		var numChars = text.length + equationChars;

		var hasCharCount = $(selector).nextAll("div.charcount_plgin").get(0);
		if (hasCharCount != null) {
			$(hasCharCount).html("Current Character Count [ " + numChars + " ] (max: " + maxChars + ")");

			if (numChars >= warnCharCount && numChars <= maxChars) {
				if ($(hasCharCount).hasClass("charsover")) $(hasCharCount).toggleClass("charsover");
				if (!$(hasCharCount).hasClass("charswarn")) $(hasCharCount).toggleClass("charswarn");
			}
			else if (numChars > maxChars) {
				if (!$(hasCharCount).hasClass("charsover")) $(hasCharCount).toggleClass("charsover");
				if ($(hasCharCount).hasClass("charswarn")) $(hasCharCount).toggleClass("charswarn");
			}
			else {
				if ($(hasCharCount).hasClass("charsover")) $(hasCharCount).toggleClass("charsover");
				if ($(hasCharCount).hasClass("charswarn")) $(hasCharCount).toggleClass("charswarn");
			}
		}

		if (editor.checkDirty())
			editor.fire($(selector).change());
	},
	editorFocus: false			// command does not require focusing on the editing document
};