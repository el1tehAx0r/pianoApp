$(function() {
	$('.charcount').charCount({ maxCharAttribute: "data-maxChars" });
	$('.wordcount').wordCount({ maxWordAttribute: "data-maxWords" });

	var reHeight = $('#richEditorHeight').val();
	if (reHeight == null) reHeight = "180px";

	$('.richEditor').ckeditor({
		toolbar:
		[
			 { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strikethrough', 'Subscript', 'Superscript', '-', 'RemoveFormat'] },
			 { name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
			 { name: 'clipboard', items: ['Cut', 'Copy', '-', 'Undo', 'Redo'] },
			 '/',
			 { name: 'editing', items: ['Find', 'Replace', 'SelectAll']},
			 { name: 'specialformatting', items: ['Link', 'Unlink', '-', 'EqnEditor', 'SpecialChar', 'HorizontalRule', '-', 'Source'] },
			 { name: 'styles', items: ['Format', 'Font', 'FontSize'] }
		],
	    extraPlugins: 'charcount,wordcount,eqneditor',
		//extraPlugins: 'eqneditor',
		height: reHeight
	});
})