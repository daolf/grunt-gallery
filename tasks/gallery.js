/*
 * grunt-gallery
 * 
 *
 * Copyright (c) 2015 Pierre de Wulf
 * Licensed under the MIT license.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var screenShotGenerator = require('./lib/screenShotGenerator.js');
var myReaderWriter = require('./lib/readerWriter.js');
var myParser = require('./lib/parser.js');
var galleryGenerator = require('./lib/galleryGenerator.js');

// Test is path dir exist 
var testPathDir = function(filepath, grunt) {    
    if (!grunt.file.isDir(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" is not directory.');
        return false;
    } else {
        return true;
    }
};
// Test is path file exist 
var testPathFile = function(filepath, grunt) {    
    if (!grunt.file.isFile(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" is not directory.');
        return false;
    } else {
        return true;
    }
};

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('gallery', 'Generate a web gallery presenting graphic components from various lib (Ext, React, etc...)', function () {

        var config = grunt.config.get([this.name, this.target]);
        var componentPath = config.files.src;
        var template = config.template;

        if (!testPathDir(componentPath,grunt)) {
            return false;
        }
        if (!testPathFile(template,grunt)) {
            return false;
        }

        var targetPath = config.files.dest;
        var jsonPath = targetPath + 'info.json';
        var components;
        var extractedExamples = [];
        var rawCode;
        var fileName;


        //try if /target exist
        if (!testPathDir(targetPath,grunt)) {
            grunt.file.mkdir(targetPath);
        }
        if (!testPathDir(targetPath+'gallery/',grunt)) {
            grunt.file.mkdir(targetPath+'gallery');
        }

        //generating concat dependancies
        grunt.config.set('concat.indexJS.dest',targetPath+'/js/index.js');
        grunt.config.set('concat.indexCSS.dest',targetPath+'/css/index.css');
        grunt.task.run(['concat:indexJS','concat:indexCSS']);

        //We read the comp directory looking for component
        components = myReaderWriter.extractJsFromDir(componentPath);
        //We extract example for each of them
        console.log('Extraction of examples ...');
        for (var i = 0; i<components.length; i++) {
            fileName = components[i];
            rawCode = myReaderWriter.read(fileName);
            var buffer = {
                name : myParser.removeExtension(path.basename(fileName)),
                file : fileName,
                example : myParser.extractCleanExamples(rawCode)
            };
            extractedExamples.push(buffer);
        }
        console.log('Extraction done');
        console.log('Writing result in '+jsonPath);
        //We write result in JSON in /target/examples.json
        myReaderWriter.write(jsonPath, JSON.stringify(extractedExamples));
        // We now generate galery
        console.log('Now generating gallery');
        galleryGenerator.generate(jsonPath,template,targetPath);
        console.log('Now generating screenshot');
        screenShotGenerator.generate(targetPath + 'iframe/',targetPath + 'img/');
    });
};