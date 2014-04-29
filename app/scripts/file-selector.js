jQuery(function($) {

	$('input:file').change(function() {
		var
			files = this.files,
			flen = files.length;

		while (flen--) {
			$(this).after('<span title="' + files[flen].name + '"></span>');
		}

	});

});
