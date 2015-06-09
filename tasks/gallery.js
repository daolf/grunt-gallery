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
		var fs = require('fs');
		var copyDir = require('copy-dir');
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
		var components;
		var extractedExamples = [];
		var rawCode;
		var fileName;
		var pathSubDir = ['gallery','css','js','js/comp','iframe','img'];

		grunt.file.delete(targetPath);

		if (!tools.testPathDir(componentPath,grunt)) {
			console.log(componentPath + ' doesn t exist');
			return false;
		}
		if (!tools.testPathFile(template,grunt)) {
			console.log(template + ' doesn t exist');
			return false;
		}

		//creation of all target subdirectories
		grunt.file.mkdir(targetPath);
		pathSubDir.map(function(element) {
			grunt.file.mkdir(targetPath + element);
		});

		//concat dependancies 
		console.log('concat js and css');
		concat.concatFiles(dep.index.js, path.join(targetPath, '/js/index.js'), tools.errorConcat);
		concat.concatFiles(dep.index.css, path.join(targetPath, '/css/index.css'), tools.errorConcat);
		concat.concatFiles(dep.gallery.js, path.join(targetPath, '/js/gallery.js'), tools.errorConcat);
		concat.concatFiles(dep.gallery.css, path.join(targetPath, '/css/gallery.css'), tools.errorConcat);
		concat.concatFiles(config.dependencies.css, path.join(targetPath, '/css/iframe.css'), tools.errorConcat);
		concat.concatFiles(config.dependencies.js, path.join(targetPath, '/js/iframe.js'), tools.errorConcat);
		//copy fonts
		console.log('copying fonts');
		copyDir.sync(__dirname+'/../node_modules/bootstrap/fonts/',path.join( targetPath, '/fonts/'));
		console.log('copying components');
		console.log(componentPath+' -> '+targetPath, '/js/');
		tools.extractJsFromDir(componentPath,path.join( targetPath, '/js/comp'));
		//copy image only if defined
		if (config.dependencies.images !== undefined ){
			console.log(config.dependencies.images+ ' -> '+path.join( targetPath, '/images/'));
			copyDir.sync(config.dependencies.images,path.join( targetPath, '/images/'));
		}

		//We read the comp directory looking for component
		components = fs.readdirSync(path.join( targetPath, '/js/comp'));
		//We extract example for each of them
		console.log('Extraction of examples ...');
		for (var i = 0; i<components.length; i++) {
			//console.log('Extraction of '+ components[i]);
			fileName = components[i];
			rawCode = tools.read(path.join( targetPath, '/js/comp/', fileName ));
			var buffer = {
				name : myParser.removeExtension(path.basename(fileName)),
				file : './js/comp/'+fileName,
				example : myParser.extractCleanExamples(rawCode)
			};
			//handle component only if there is example
			if ( buffer.example.length > 0 ) {
				extractedExamples.push(buffer);
			}
			//console.log('Extraction of '+ components[i]+ ' done');
		}
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