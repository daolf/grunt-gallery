/*
 * grunt-gallery
 * 
 *
 * Copyright (c) 2015 Pierre de Wulf
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.registerMultiTask('gallery', 'Generate a web gallery presenting graphic components from various lib (Ext, React, etc...)', function () {

        var path = require('path');
        var fs = require('fs');
        var copyDir = require('copy-dir');
        var concat = require('./lib/concatFiles.js');
        var dep = require('./lib/distribDependancies.js');
        var screenShotGenerator = require('./lib/screenShotGenerator.js');
        var myParser = require('./lib/parser.js');
        var galleryGenerator = require('./lib/galleryGenerator.js');
        var tools = require ('./lib/tools.js');

        var config = grunt.config.get([this.name, this.target]);
        var componentPath = config.files.src;
        var template = config.template;

        if (!tools.testPathDir(componentPath,grunt)) {
            return false;
        }
        if (!tools.testPathFile(template,grunt)) {
            return false;
        }

        var targetPath = config.files.dest;
        var jsonPath = targetPath + 'info.json';
        var components;
        var extractedExamples = [];
        var rawCode;
        var fileName;


        //try if /target exist
        if (!tools.testPathDir(targetPath,grunt)) {
            grunt.file.mkdir(targetPath);
        }
        if (!tools.testPathDir(targetPath+'gallery/',grunt)) {
            grunt.file.mkdir(targetPath+'gallery');
        }
        if (!tools.testPathDir(targetPath+'/css',grunt)) {
            grunt.file.mkdir(targetPath+'/css');
        }
        if (!tools.testPathDir(targetPath+'/js',grunt)) {
            grunt.file.mkdir(targetPath+'/js');
        }
        if (!tools.testPathDir(targetPath+'/js/comp',grunt)) {
            grunt.file.mkdir(targetPath+'/js/comp');
        }


        //concat dependancies 
        console.log('concat js and css');
        concat.concatFiles(dep.index.js,targetPath+'/js/index.js',tools.errorConcat);
        concat.concatFiles(dep.index.css,targetPath+'/css/index.css',tools.errorConcat);
        concat.concatFiles(dep.gallery.js,targetPath+'/js/gallery.js',tools.errorConcat);
        concat.concatFiles(dep.gallery.css,targetPath+'/css/gallery.css',tools.errorConcat);
        concat.concatFiles(config.dependencies.css,targetPath+'/css/iframe.css',tools.errorConcat);
        concat.concatFiles(config.dependencies.js,targetPath+'/js/iframe.js',tools.errorConcat);
        //copy fonts
        console.log('copying fonts');
        copyDir.sync(__dirname+'/../node_modules/bootstrap/fonts/',targetPath+'/fonts/');
        console.log('copying components');
        console.log(componentPath+' -> '+targetPath+'/js/');
        tools.extractJsFromDir(componentPath,targetPath+'/js/comp');
        copyDir.sync(componentPath,targetPath+'/js/');
        console.log(config.dependencies.images+ ' -> '+targetPath+'/images/');
        copyDir.sync(config.dependencies.images,targetPath+'/images/');

        //We read the comp directory looking for component
        components = fs.readdirSync(targetPath+'/js/comp');
        //We extract example for each of them
        console.log('Extraction of examples ...');
        for (var i = 0; i<components.length; i++) {
            console.log('Extraction of '+ components[i]);
            fileName = components[i];
            rawCode = tools.read(targetPath+'/js/comp/'+fileName);
            var buffer = {
                name : myParser.removeExtension(path.basename(fileName)),
                file : './js/comp/'+fileName,
                example : myParser.extractCleanExamples(rawCode)
            };
            extractedExamples.push(buffer);
            console.log('Extraction of '+ components[i]+ ' done');
        }
        console.log('Extraction done');
        console.log('Writing result in '+jsonPath);
        //We write result in JSON in /target/examples.json
        tools.write(jsonPath, JSON.stringify(extractedExamples));
        // We now generate galery
        console.log('Now generating gallery');
        galleryGenerator.generate(jsonPath,template,targetPath);
        console.log('Now generating screenshot');
        screenShotGenerator.generate(targetPath + 'iframe/',targetPath + 'img/');
    });
};