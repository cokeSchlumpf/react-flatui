module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    amdwrap: {
      src: {
        expand: true,
        cwd: 'src/js',
        src: ['**/*.js'],
        dest: 'dist/amd/lib'
      },
      
      transpiled: {
        expand: true,
        cwd: 'transpiled/',
        src: ['**/*.js'],
        dest: 'dist/amd/lib'
      }
    },
    
    "bower-install-simple": {
			options: {
				directory: 'src/js/util'
      },
			prod: {
				options: {
					production: true
				}
		  }
    },
    
    clean: {
      amd: ['dist/amd'],
      bower: ['src/js/util'],
      cjs: ['dist/lib'],
      transpiled: ['transpiled'],
      docs: ['docs/css/bootstrap*.css', 'docs/css/react-flatui.min.css'],
      ghPage: ['css/*', 'js/*', 'index.html']
    },
    
    copy: {
      amd: {
        files: [
          {
            src: ['**/*'],
            dest: 'dist/amd/',
            cwd: 'tools/amd',
            expand: true
          },
          {
            src: ['.gitignore-template'],
            dest: 'dist/amd/',
            cwd: 'tools/amd',
            expand: true
          }
        ]
      },
      
      cjs: {
        files: [
          {
            expand: true,
            cwd: 'transpiled/',
            src: ['**/*.js'],
            dest: 'dist/lib'
          },
          {
            expand: true,
            cwd: 'src/js',
            src: ['**/*.js'],
            dest: 'dist/lib'
          },
          {
            src: ['**/*'],
            dest: 'dist/lib',
            cwd: 'tools/cjs',
            expand: true
          }
        ]
      },
      
      docs: {
        files: [
          {
            expand: true,
            cwd: 'dist/amd/css',
            src: ['*.css'],
            dest: 'docs/css'
          },
          {
            expand: true,
            cwd: '../bootstrap-3.3.4/dist/css',
            src: ['**/*.min.css'],
            dest: 'docs/css'
          }
        ]
      },
      
      exec: {
        bower: {
          command: 'cd ../react-flatui-bower && git tag -a v<%= pkg.version %> -m \'version <%= pkg.version %>\' && git push origin v<%= pkg.version %> && cd -';
        },
        ghPage: {
          command: 'cd ../react-flatui-ghpages && git push && cd -';
        }
      },
      
      ghPage: {
          files: [
            {
              expand: true,
              cwd: 'docs',
              src: ['css/*', 'js/*', 'fonts/*', 'index.html'],
              dest: '../react-flatui-ghpages'
            }
          ]
      },
      
      bower: {
          files: [
            {
              expand: true,
              cwd: 'dist/amd',
              src: ['**/*'],
              dest: '../react-flatui-bower'
            }
          ]
      },
      
      options: {
        process: function (content, srcpath) {
          return grunt.template.process(content);
        }
      }
    },
    
    less: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				compress: true
      },
			src: {
        expand: true,
        cwd: 'src/less',
        src: 'react-flatui.less',
        ext: '.min.css',
        dest: 'dist/amd/css'
      }
    },
    
    react: {
      options: {
        harmony: true
      },
      
      src: {
        files: [
          {
            expand: true,
            cwd: 'src/js',
            src: ['**/*.jsx'],
            dest: 'transpiled',
            ext: '.js'
          }
        ]
      },
    },
    
    release: {
      options: {
        folder: 'dist/lib',
        additionalFiles: ['dist/lib/package.json', 'dist/amd/bower.json'],
        github: {
          repo: '<%= pkg.repository.url %>',
          usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username 
          passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password 
        }
      }
    },
    
    requirejs: {
      dev: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          baseUrl: "dist/amd",
          paths: {
            "react-flatui": "./index",
            almond: "../../tools/vendor/almond"
          },
          packages: [
            {	name: 'react', location: '../../node_modules/react', main: './react' },
            { name: 'react-bootstrap', location: '../../node_modules/react-bootstrap', main: './amd/react-bootstrap' },
            { name: 'jquery', location: '../../node_modules/jquery', main: './dist/jquery' }
          ],
          include: ["almond", "react-flatui"],
          exclude: ["react", "react-bootstrap", "jquery"],
          out: "dist/amd/react-flatui.js",
          cjsTranslate: true,
          wrap: {
            startFile: "tools/wrap.start",
            endFile: "tools/wrap.end"
          },
          rawText: {
            'react': 'define({});'
          },
          optimize: "none"
        }
      }
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'dist/amd/<%= pkg.name %>.js',
        dest: 'dist/amd/<%= pkg.name %>.min.js'
      }
    },
    
    watch: {
      all: {
        files: [
          'src/**/*.jsx',
          'src/**/*.js',
          'src/**/*.less'
        ],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    }
  });
  
  grunt.loadNpmTasks("grunt-amd-wrap");
  grunt.loadNpmTasks("grunt-bower-install-simple")
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-contrib-less");
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-shell');
   
  grunt.registerTask('build', [
    'clean:amd',
    'clean:cjs',
    'clean:docs',
    'react:src',
    'amdwrap',
    'copy:amd',
    'copy:cjs',
    'requirejs:dev',
    'uglify:build',
    'less',
    'copy:docs',
    'clean:transpiled'
  ]);
  
  grunt.registerTask('update', [
    'clean:bower',
    'bower-install-simple'
  ]);
  
  grunt.registerTask('default', ['build']);
  
  grunt.registerTask('ghPage', [ 'clean:ghPage', 'copy:ghPage' ]);
  
  grunt.registerTask('patchRelease', ['build', 'release:patch', 'ghPage', 'copy:bower']);
  
  grunt.registerTask('releaseBower', ['exec:bower', 'exec:ghPage']);
  
}