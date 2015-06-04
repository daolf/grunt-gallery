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
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        gallery: {
            options: {
                //to be designed
            },
            ext : {
                files: {
                    src : './privateRessources/extComp',
                    dest : './target/'
                },
                template : './views/extComp.jade',
                dependancies : {
                        
                }
            },
            react : {
                files: {
                    src : './publicRessources/react/',
                },
                template : './views/reactComp.jade',
            },
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

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'jasmine_nodejs']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
