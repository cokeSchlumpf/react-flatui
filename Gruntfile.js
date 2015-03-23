module.exports = function (grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    amdwrap: {
      src: {
        expand: true,
        cwd: 'src/',
        src: ['**/*.js'],
        dest: 'amd/lib'
      },
      
      transpiled: {
        expand: true,
        cwd: 'transpiled/',
        src: ['**/*.js'],
        dest: 'amd/lib'
      }
    },
    
    clean: {
      transpiled: ['transpiled'],
      cjs: ['lib'],
      amd: ['amd']
    },
    
    copy: {
      amd: {
        files: [
          {
            src: ['**/*'],
            dest: 'amd/',
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
            dest: 'lib/'
          },
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'lib/'
          },
          {
            src: ['**/*'],
            dest: 'lib/',
            cwd: 'tools/cjs',
            expand: true
          }
        ]
      },
      options: {
        process: function (content, srcpath) {
          return grunt.template.process(content);
        }
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
            cwd: 'src',
            src: ['**/*.js'],
            dest: 'transpiled',
            ext: '.js'
          }
        ]
      },
    },
    
    requirejs: {
      dev: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          baseUrl: "amd",
          paths: {
            "react-bootstrap": "./index",
            almond: "../tools/vendor/almond"
          },
          packages: [
            {	name: 'react', location: '../node_modules/react', main: './react' }
          ],
          include: ["almond", "react-bootstrap"],
          exclude: ["react"],
          out: "amd/react-bootstrap.js",
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
        src: 'amd/<%= pkg.name %>.js',
        dest: 'amd/<%= pkg.name %>.min.js'
      }
    }
  }
  
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks("grunt-amd-wrap");
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
   
  grunt.registerTask('build', [
    'clean:amd',
    'clean:cjs',
    'react:src',
    'amdwrap',
    'copy',
    'requirejs:dev',
    'uglify:build',
    'clean:transpiled'
  ]);
  
  grunt.registerTask('default', ['build']);
  
}