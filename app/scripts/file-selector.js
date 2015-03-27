jQuery(function($) {

	$('input:file').change(function() {
		var
			files = this.files,
			flen = files.length;

		while (flen--) {
			$(this).next('span').append('<b title="' + files[flen].name + '"></b>');
		}

	});

});
