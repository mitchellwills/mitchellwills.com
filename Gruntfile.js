module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      js: {
        src: ['js/**/*.js'],
        dest: 'build/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      gruntfile: {
        src: ['Gruntfile.js'],
      },
      js: {
        src: ['js/**/*.js'],
      },
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    copy: {
      lib: {
        src: ['lib/**/*', 'fancybox/**/*'],
        dest: 'build/dist/',
      },
      content: {
        src: 'content/**/*',
        dest: 'build/dist/',
      },
      fonts: {
        src: 'fonts/**/*',
        dest: 'build/dist/',
      },
      views: {
        src: 'views/**/*',
        dest: 'build/dist/',
      },
      css: {
        src: 'css/**/*',
        dest: 'build/dist/',
      },
      js: {
        src: 'js/**/*',
        dest: 'build/dist/',
      },
      index: {
        src: 'index.html',
        dest: 'build/dist/',
      },
      favicon: {
        src: 'favicon.ico',
        dest: 'build/dist/',
      },
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'mitchellwills.com',
          port: 21,
        },
        src: 'build/dist',
        dest: '/test',
        exclusions: []
      }
    },
    connect: {
      server: {
        options: {
          port: 8081,
          base: 'build/dist',
          debug: true,
          livereload: true,
          middleware: function(connect, options){
            return [
              connect.static(options.base),
              function(req, res, next){//if couldn't find a file to serve then just serve index.html
                console.log("Rewriting URL: "+req.url+" -> /");
                req.url = "/";
                next();
              },
              connect.static(options.base),
            ];
          },
        }
      }
    },
	watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },
      dist: {
        files: 'build/dist/**/*',
        options: {
          livereload: true,
        },
      },
      js: {
        files: 'js/**/*.js',
        tasks: ['jshint:js', 'concat:js', 'uglify:js', 'copy:js'],
      },
      css: {
        files: 'css/**/*.css',
        tasks: ['copy:css'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  
  grunt.registerTask('default', ['dist']);
  grunt.registerTask('dist', ['jshint', 'concat', 'uglify', 'copy']);
  grunt.registerTask('deploy', ['ftp-deploy']);
  grunt.registerTask('dev', ['connect', 'watch']);

};