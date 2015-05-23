var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

//Clean//
var del = require('del');
gulp.task('clean', function (cb) {
  del([
    './dist/mail/*',
    './dist/*.*'
  ], cb);
});

//Build//
var runSequence = require('run-sequence');
gulp.task('templates', function() {
  var locals = {
    maplink: 'https://maps.google.com/maps?expflags=enable_star_based_justifications:true&ie=UTF8&cid=17452686713591379491&q=Verona+%D0%9C%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C&iwloc=A',
    mapsrc: 'http://maps.googleapis.com/maps/api/staticmap?center=42.85925,74.61671&markers=color:0xff11ff|label:VM|42.85910,74.62180&zoom=15&size=640x300&maptype=roadmap',
    address: 'г. Бишкек Октябрьский р-он, улица Кулатова 2',
    phone: {
      mobile: '(555) 68 45 68',
      work: '(312) 89 58 89'
    }
  };

  return gulp.src('./app/jade/*.jade')
    .pipe(plugins.jade({
      basedir: './app/jade/',
      locals: locals
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function () {
  return gulp.src('./app/styles/main.styl')
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.stylus({
        compress: true
      })
    )
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', function() {
  return gulp.src([
      './bower_components/jquery/dist/jquery.js',
      './app/scripts/*.js'
    ])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('mail', function() {

  return gulp.src([
      './app/mail/*'
    ])
    .pipe(gulp.dest('./dist/mail/'));
});

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    [
      'templates',
      'styles',
      'scripts',
      'mail'
    ],
    cb
  );
});

gulp.task('default', ['build']);

//Deploy//
var fs = require('fs');
var yaml = require('js-yaml');
var doc = yaml.safeLoad(fs.readFileSync('./secret.yml'));
var ssh = plugins.ssh({
  sshConfig: {
    host: doc.host,
    port: doc.port,
    username: doc.username,
    privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
  }
});

gulp.task('deploy:clean', function () {
  var swipe = 'find ' + doc.path + ' -maxdepth 2 -type f -delete';

  return ssh
    .exec([swipe], {filePath: 'commands.log'})
    .pipe(gulp.dest('logs'));
});

gulp.task('deploy:upload', function() {
  return gulp.src([
      './dist/mail/*',
      './dist/*.*',
      './vendor/**/*'
    ])
    .pipe(ssh.sftp('write', doc.path));
});

gulp.task('deploy', ['deploy:clean', 'deploy:upload']);
