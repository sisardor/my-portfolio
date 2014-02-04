module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		// configured a task
		concat: {
			options: {
	        	banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %>  Все права защишены. */\n'
	      	},
			js : {
				src  : [
					'_layout/js/cufon/cufon-yui.js',
					'_layout/js/cufon/hattori_hanzo.font.js',
					'_layout/js/tipsy/jquery.tipsy.js',
					'_layout/js/prettyphoto/jquery.prettyPhoto.js'
				],
				dest : 'tmp/test.js'
			},
			css: {
				src  : [
						'_layout/style.css',
						'_layout/js/tipsy/css.tipsy.css',
						'_layout/js/prettyphoto/css.prettyPhoto.css',
						],
				dest : 'tmp/test.css'
			},
			extras: {
				src  : [
						'tmp/src/jquery.min.js',
						'tmp/src/angular.min.js',
						'tmp/src/angular-animate.min.js',
						'tmp/src/angular-route.min.js',
						'tmp/src/angular-touch.min.js',
						'tmp/src/angular-sanitize.min.js',
						'tmp/src/TweenMax.min.js',
						'_layout/angular/app.js'
						],
				dest : 'tmp/uzlist-angular.js'
			}
			// dist: {
		 //      src  : ['public/src/js/**/*.js','public/assets/lib/fancybox/jquery.fancybox.min.js'],
			// 	dest : 'public/assets/build/js/<%= pkg.name %>.v<%= pkg.app_version %>.js'
		 //    }
		},

	    uglify: {
	      options: {
	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	      },
		  js: {
		    src: ['tmp/uzlist-angular.js','tmp/test.js'],
		    dest: 'tmp/MAIN.js'
		  },
		 //  extras: {
			// 	src  : ['public/assets/build/js/uzlist-angular.js'],
			// 	dest : 'public/assets/build/js/uzlist-angular.min.js'
			// }
		  // js: {
		  //   src: 'public/assets/build/js/uzlist-angular.js',
		  //   dest: 'public/assets/build/js/uzlist-angular.min.js'
		  // }
		},

		cssmin: {
		  add_banner: {
		    options: {
		      banner: '/* <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> Все права защишены. */\n'
		    },
		    files: {
		      'tmp/test.min.css': ['tmp/test.css'],
		    }
		  }
		},

		'curl-dir': {
			options: {
	        	banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
	      	},
			long: {
				src  : ['http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js',
						'http://code.angularjs.org/1.2.9/angular.min.js',
						'http://code.angularjs.org/1.2.9/angular-animate.min.js',
						'http://code.angularjs.org/1.2.9/angular-route.min.js',
						'http://code.angularjs.org/1.2.9/angular-touch.min.js',
						'http://code.angularjs.org/1.2.9/angular-sanitize.min.js',
						'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.10.3/TweenMax.min.js'
					],
				dest : 'tmp/src/'
			}
		},
		env : {
		    options : {
		        /* Shared Options Hash */
		        //globalOption : 'foo'
		    },
		    dev: {
		        NODE_ENV : 'DEVELOPMENT'
		    },

		    prod : {
		        NODE_ENV : 'PRODUCTION'
		    }
		},
		preprocess : {

		    dev : {

		        src : 'javascripts_template.html',
		        dest : 'app/views/partials/javascripts.php',
		        options : {
		            context : {
		                name : '<%= pkg.name %>',
		                app_version : '<%= pkg.app_version %>'
		            }
		        }

		    },
		   	dev_css : {

		        src : 'stylesheets_template.html',
		        dest : 'app/views/partials/style-sheets.php',
		        options : {
		            context : {
		                name : '<%= pkg.name %>',
		                app_version : '<%= pkg.app_version %>'
		            }
		        }

		    },

		    prod : {
		        src : 'javascripts_template.html',
		        dest : 'app/views/partials/javascripts.php',
		        options : {
		            context : {
		                name : '<%= pkg.name %>',
		                app_version : '<%= pkg.app_version %>'
		            }
		        }
		    },
		    prod_css : {
		        src : 'stylesheets_template.html',
		        dest : 'app/views/partials/style-sheets.php',
		        options : {
		            context : {
		                name : '<%= pkg.name %>',
		                app_version : '<%= pkg.app_version %>'
		            }
		        }
		    }
		},
		clean:  ["public/assets/build/css/", "public/assets/build/js/","public/src/vendor/"],
		
	});

	// loaded a task
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-contrib-clean');

	// load a custom task
	grunt.loadTasks('grunt_tasks');

	// concat all files
	grunt.registerTask('default', ['curl-dir','concat','cssmin','uglify']);

	// grunt.registerTask('dev', [ 'clean','env:dev', 'preprocess:dev','preprocess:dev_css']);

	// grunt.registerTask('prod', [ 'clean','env:prod', 'curl-dir','concat','uglify','cssmin','env:prod', 'preprocess:prod', 'preprocess:prod_css']);
}