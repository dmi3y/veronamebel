var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('tmpls', function() {
  var locals = {
    phone: {
      mobile: '123456'
    }
  };

  gulp.src('./app/jade/*.jade')
    .pipe(plugins.jade({
      basedir: './app/jade/',
      locals: locals
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function () {
  gulp.src('./app/styles/*.styl')
    .pipe(plugins.stylus({
        compress: true
      })
    )
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest('./dist/styles/'));
});
