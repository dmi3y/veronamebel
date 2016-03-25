jQuery(function($) {

	$('input:file').change(function() {
		var
			files = this.files,
			flen = files.length,
      fCont = $(this).next('span');

    fCont.empty();

    while (flen--) {

      fCont
        .append('<b title="' + files[flen].name + '"></b>');
		}

	});

});
