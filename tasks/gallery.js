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

        grunt.file.defaultEncoding = 'utf-8';
        
        var path = require('path');
        var copy_dir = require('copy-dir');
        var concat = require('./lib/concatFiles.js');
        var dep = require('./lib/distribDependancies.js');
        var screenShotGenerator = require('./lib/screenShotGenerator.js');
        var myParser = require('./lib/parser.js');
        var galleryGenerator = require('./lib/galleryGenerator.js');
        var tools = require ('./lib/tools.js');
        
        var config = grunt.config.get([this.name, this.target]);
        var componentPath = config.files.src+'/';
        var template = config.template;
        var targetPath = config.files.dest+'/';        
        var jsonPath = targetPath + 'info.json';
        var extractedExamples = [];
        var pathSubDir = ['gallery','css','js','js/comp','iframe','img'];

        grunt.file.delete(targetPath);

        if (!tools.testPathDir(componentPath,grunt)) {
            grunt.fail.warn(componentPath + ' doesn t exist');
        }
        if (!tools.testPathFile(template,grunt)) {
            grunt.fail.warn(template + ' doesn t exist');
        }

        //creation of all target subdirectories
        grunt.file.mkdir(targetPath);
        pathSubDir.map(function(element) {
            grunt.file.mkdir(targetPath + element);
        });

        //concat dependancies 
        console.log('concat js and css');
        concat.concatFiles(dep.index.js, path.join(targetPath, '/js/index.js'));
        concat.concatFiles(dep.index.css, path.join(targetPath, '/css/index.css'));
        concat.concatFiles(dep.gallery.js, path.join(targetPath, '/js/gallery.js'));
        concat.concatFiles(dep.gallery.css, path.join(targetPath, '/css/gallery.css'));
        concat.concatFiles(grunt.file.expand(config.dependencies.js), path.join(targetPath, '/js/iframe.js'));
        concat.concatFiles(grunt.file.expand(config.dependencies.css), path.join(targetPath, '/css/iframe.css'));
        //copy fonts
        console.log('copying fonts');
        copy_dir.sync(__dirname+'/../node_modules/bootstrap/fonts/',path.join( targetPath, '/fonts/'));
        //copy components
        console.log('copying components');
        console.log(componentPath+' -> '+targetPath, '/js/');
        // we extract all component in componentPath and copy them in targetPath+/js/comp
        tools.extractJsFromDir(componentPath,path.join( targetPath, '/js/comp'));
        //copy image only if defined
        var images = config.dependencies.images;
        if (images !== undefined) {
            tools.customCopyDir(images,path.join( targetPath, '/images/'));
        }
        
        //Extract information of component in /targetPath+'js/comp'
        console.log('Extraction of information ...');
        extractedExamples = galleryGenerator.extractInformation(path.join( targetPath, '/js/comp'),myParser);
        
        console.log('Extraction done');
        console.log('Writing result in '+jsonPath);
        //We write result in JSON in /target/examples.json
        tools.write(jsonPath, JSON.stringify(extractedExamples));
        // We now generate galery
        console.log('Now generating gallery');
        galleryGenerator.generate(jsonPath,template,targetPath);
        console.log('Now generating screenshot');
        screenShotGenerator.generate(path.join(targetPath + 'iframe/'),path.join(targetPath + 'img/'));
    });
};