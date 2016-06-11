/*global jQuery*/
jQuery(function ($) {
  'use strict'
  $('input:file').change(function () {
    var files = this.files
    var flen = files.lengt
    var fCont = $(this).next('span')

    fCont.empty()

    while (flen--) {
      fCont
        .append('<b title="' + files[flen].name + '"></b>')
    }
  })
})
