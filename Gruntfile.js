/*
 * grunt-gallery
 * 
 *
 * Copyright (c) 2015 Pierre de Wulf
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	// load all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			}
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			build: ['target'],
			tests: ['test/tmp']
		},

		// Configuration to be run (and then tested).
		gallery: {
			options: {
				//to be designed
				spawn: false
			},
			ext : {
				files: {
					src : './privateRessources/extComp',
					dest : './test/tmp/ext/'
				},
				template : './views/extComp.jade',
				dependencies : {
					js : ['./privateRessources/extjs.git/src3.4.2/adapter/ext/ext-base-debug.js',
						  './privateRessources/extjs.git/src3.4.2/ext-all-debug.js'],
					css : './privateRessources/extjs.git/src3.4.2/resources/css/ext-all.css',
					images : './privateRessources/extjs.git/src3.4.2/resources/images/'

				}
			},
			react : {
				files: {
					src : './publicRessources/react/',
					dest : './test/tmp/react/'
				},
				template : './views/reactComp.jade',
				dependencies : {
					js : ['./node_modules/es5-shim/es5-shim.min.js',
						  './node_modules/react/dist/react-with-addons.min.js'],
					css : './views/css/customCss.css'
				}
			},
			react_without_slash : {
				files: {
					src : './publicRessources/react',
					dest : './test/tmp/react_without_slash'
				},
				template : './views/reactComp.jade',
				dependencies : {
					js : ['./node_modules/es5-shim/es5-shim.min.js',
						  './node_modules/react/dist/react-with-addons.min.js'],
					css : './views/css/customCss.css'
				}
			},
			react_multiple_level_path : {
				files: {
					src : './publicRessources/react',
					dest : './test/tmp/react_multiple/level'
				},
				template : './views/reactComp.jade',
				dependencies : {
					js : ['./node_modules/es5-shim/es5-shim.min.js',
						  './node_modules/react/dist/react-with-addons.min.js'],
					css : './views/css/customCss.css'
				}
			}
		},
		nodeunit: {
			tests: ['test/*_test.js']
		},
		jasmine_nodejs: {
			options: {
				// specNameSuffix: 'spec.js', // also accepts an array
				helperNameSuffix: 'helper.js',
				useHelpers: false,
				stopOnFailure: false,
				// configure one or more built-in reporters
				reporters: {
					console: {
						colors: true,
						cleanStack: 1,       // (0|false)|(1|true)|2|3
						verbosity: 3,        // (0|false)|1|2|(3|true)
						listStyle: 'indent', // 'flat'|'indent'
						activity: false
					}
				}
			},
			local: {
				// target specific options
				options: {
					useHelpers: false
				},
				// spec files
				specs: [
					'test/localSpec/**'
				]
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'jasmine_nodejs', 'gallery:react', 'gallery:react_without_slash', 'gallery:react_multiple_level_path', 'nodeunit' ]);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
