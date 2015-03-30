// Generated on 2014-03-11 using generator-jade 0.5.4
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // configurable paths
  var folders = {
    app: 'app',
    dist: 'dist',
    tmp: '.tmp'
  };

  grunt.initConfig({
    folders: folders,
    secret: grunt.file.readYAML('secret.yml'),
    privatekey: grunt.file.read(process.env.HOME.concat('/.ssh/id_rsa')),
    sftp: {
      upload: {
        files: {
          './': 'dist/**'
        },
        options: {
          path: '<%= secret.path %>',
          host: '<%= secret.host %>',
          username: '<%= secret.username %>',
          // password: '<%= secret.password %>',
          privateKey: '<%= privatekey %>',
          showProgress: true,
          srcBasePath: 'dist/'
        }
      }
    },
    sshexec: {
      swipe: {
        command: 'find <%= secret.path %> -maxdepth 2 -type f -delete',
        options: {
          host: '<%= secret.host %>',
          username: '<%= secret.username %>',
          // password: '<%= secret.password %>',
          privateKey: '<%= privatekey %>'
        }
      }
    },
    watch: {
      stylus: {
        files: '<%= folders.app %>/styles/**/*.styl',
        tasks: ['stylus', 'autoprefixer']
      },
      server: {
        options: {
          livereload: true
        },
        files: [
          '<%= folders.tmp %>/*.html',
          '<%= folders.tmp %>/styles/{,*/}*.css',
          '{.tmp,<%= folders.app %>}/scripts/{,*/}*.js',
          '<%= folders.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      jade: {
        files: '<%= folders.app %>/jade/**/*.jade',
        tasks: ['jade']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        livereload: true
      },
      server: {
        options: {
          open: true,
          base: [
            '<%= folders.tmp %>',
            '<%= folders.app %>'
          ]
        }
      },
      test: {
        options: {
          base: [
            '<%= folders.tmp %>',
            'test',
            '<%= folders.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: [
            '<%= folders.dist %>'
          ],
          livereload: false
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= folders.tmp %>',
            '<%= folders.dist %>/*',
            '!<%= folders.dist %>/.git*'
          ]
        }]
      },
      server: '<%= folders.tmp %>'
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%= connect.options.port %>/index.html']
        }
      }
    },
    stylus: {
      compile: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/styles',
          src: ['{,*/}*.styl', '!**/_*'],
          dest: '<%= folders.tmp %>/styles',
          ext: '.css'
        }],
        options: {
          compress: false,
          // convert the css url() declaration into nib inline imaging function
          // this converts images smaller than 30kb to data url
          urlfunc: 'url'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      prefixit: {
        files: [{
          expand: true,
          cwd: '<%= folders.tmp %>/styles',
          src: ['{,*/}*.css', '!**/_*'],
          dest: '<%= folders.tmp %>/styles',
          ext: '.css'
        }]
      }
    },
    jade: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>/jade',
          src: ['{,*/}*.jade', '!**/_*'],
          dest: '.tmp/',
          ext: '.html'
        }],
        options: {
          client: false,
          pretty: true,
          basedir: '<%= folders.app %>/jade',
          data: function(dest /*, src*/) {

            var
              page = (/.*\/(.+).html/).exec(dest)[1],
              maplink = 'https://maps.google.com/maps?expflags=enable_star_based_justifications:true&ie=UTF8&cid=17452686713591379491&q=Verona+%D0%9C%D0%B5%D0%B1%D0%B5%D0%BB%D1%8C&iwloc=A',
              mapsrc = 'http://maps.googleapis.com/maps/api/staticmap?center=42.85925,74.61671&markers=color:0xff11ff|label:V|42.85910,74.62180&zoom=15&size=640x300&maptype=roadmap&sensor=false';

            return {
              page: page,
              maplink: maplink,
              mapsrc: mapsrc,
              phone: {
                mobile: '(555) 68 45 68',
                work: '(312) 89 58 89',
                address: 'г. Бишкек Октябрьский р-он, улица Кулатова 2'
              }
            };
          }
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= folders.dist %>/scripts/{,*/}*.js',
            '<%= folders.dist %>/styles/{,*/}*.css',
            '<%= folders.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%= folders.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= folders.tmp %>/index.html',
      options: {
        dest: '<%= folders.dist %>'
      }
    },
    usemin: {
      html: ['<%= folders.dist %>/{,*/}*.html'],
      css: ['<%= folders.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= folders.dist %>']
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= folders.dist %>/styles/main.css': [
            '<%= folders.tmp %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/folders/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= folders.tmp %>',
          src: '{,*/}*.html',
          dest: '<%= folders.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*'
          ]
        }]
      },
      js: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: [
            'scripts/{,*/}*js', 'bower_components/**/*js'
          ]
        }]
      },
      css: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.tmp %>',
          src: [
            'styles/{,*/}*css'
          ]
        }]
      },
      assets: {
        files: [{
          expand: true,
          cwd: '<%= folders.app %>',
          dest: '<%= folders.dist %>',
          src: [
            'assets/{,*/}*.*'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'stylus'
      ],
      test: [
        'stylus'
      ],
      dist: [
        'stylus',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      build: ['<%= folders.app %>/scripts/**/*js']
    }
  });

  grunt.registerTask('server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'jade',
      'concurrent:server',
      'autoprefixer',
      'connect:server',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jade',
    'copy:js',
    'copy:css',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'copy:assets',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'sshexec:swipe',
    'sftp:upload'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
