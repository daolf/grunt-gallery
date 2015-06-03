/*
 * grunt-gallery
 * 
 *
 * Copyright (c) 2015 Pierre de Wulf
 * Licensed under the MIT license.
 */
'use strict';

var fs = require('fs');
var screenShotGenerator = require('./lib/screenShotGenerator.js');
var myReaderWriter = require('./lib/readerWriter.js');
var myParser = require('./lib/parser.js');
var galleryGenerator = require('./lib/galleryGenerator.js');

var testPath = function(filepath, grunt) {    
    if (!grunt.file.isDir(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" is not directory.');
        return false;
    }
};

module.exports = function (grunt) {
    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('gallery', 'Generate a web gallery presenting graphic components from various lib (Ext, React, etc...)', function () {

        var config = grunt.config.get([this.name, this.target]);
        var componentPath = config.files.src;
        var template = config.template;

        testPath(componentPath,grunt);
        testPath(template,grunt);

        var targetPath = './target/';
        var jsonPath = targetPath + 'info.json';
        var components;
        var extractedExamples = [];
        var rawCode;
        var fileName;
        var stats;

        //try if /target exist
        try {
            stats = fs.lstatSync('./target');
        }
        catch (e) {
            //if not we create it
            console.log('creating dir /target');
            fs.mkdirSync('./target');
        }


        // Test if /target/gallery exist
        try {
            stats = fs.lstatSync(targetPath + 'gallery');
        }
        catch (e) {
            //if not we create it
            console.log('creating dir /target/gallery');
            fs.mkdirSync(targetPath + 'gallery/');
        }

        //We read the comp directory looking for component
        components = fs.readdirSync(componentPath);
        //We extract example for each of them
        console.log('Extraction of examples ...');
        for (var i = 0; i<components.length; i++) {
            fileName = components[i];
            rawCode = myReaderWriter.read(componentPath+fileName);
            var buffer = {
                name : myParser.removeExtension(fileName),
                file : componentPath+fileName,
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
        galleryGenerator.generate(jsonPath,template);
        console.log('Now generating screenshot');
        screenShotGenerator.generate(targetPath + 'iframe/',targetPath + 'img/');
    });
};