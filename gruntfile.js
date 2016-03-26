module.exports = function(grunt) {
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		watch: {
		  options: {
			livereload: true,
			//files:[]
		  },
/*
		  scripts: {
			files: [
			  'src/js/*.js'
			],
			tasks: [
			  'jshint',
			  'uglify'
			]
		  },
*/
		  styles: {
			files: [
			 'src/less/*.less'
			],
			tasks: [
			  'less:development'
			]
		  },
		  template: {
			files: [
			 'src/jade/*.jade'
			],
			tasks: [
			  'jade:debug'
			]
		  },
		},
		connect: {
			server: {
				options: {
				port: 3000,
						livereload: 35729,
						hostname: 'localhost',
						files: [],
				},
				livereload: {
					options: {
						open:true,
						files: [],
					}
				}
			}
		},

		jade: {
		  debug: {
			options: {
			  data: {
				debug: true
			  }
			},
			files: {
			  "index.html": "src/jade/template.jade"
			}
		  },
		  release: {
			options: {
			  data: {
				debug: false
			  }
			},
			files: {
			  "release.html": "src/jade/template.jade"
			}
		  }
		},
		less: {
			development: {
				options: {
					paths: ["assets/css"]
				},
				files: {
					"src/css/result.css": "src/less/source.less"
				}
			},
			production: {
				options: {
					paths: ["assets/css"],
					plugins: [
						new (require('less-plugin-autoprefix'))({browsers: ["last 4 versions"]}),
						//new (require('less-plugin-clean-css'))(cleanCssOptions)
					]
				},
				files: {
					"src/css/result.css": "src/less/source.less"
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'grunt/',
					src: ['*.css', '!*.min.css'],
					dest: 'postgrunt/',
					ext: '.min.css'
				}]
			}
		},
		imagemin:{
			dynamic: {
				files: [{
					expand: true,
					cwd: 'photo/',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'dist/'
				}]
			}
		}
	}
);
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.registerTask('dev',['connect','watch']);
};