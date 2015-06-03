/* the purpose of this file is to generate html files with jade tempates in views */
var jade = require('jade');
var readerWriter = require('./readerWriter.js');
var fs = require('fs');
/*
 * Generate html page for each item in a JSON containing folowing fields : example,file and name
 *
 * @param file          file name of the JSON file
 * @param template      jade template used for génération
 * @param target        output directory
 *
 * @return nothing      write one html files per item in JSON file
 */
var generate = function (file, template, target) {
    // Test if /target/gallery/template exist
    try {
        stats = fs.lstatSync('./target/iframe');
    }
    catch (e) {
        //if not we create it
        console.log('creating dir /target/iframe');
        fs.mkdirSync('./target/iframe/');
    }

    var templateIframe = readerWriter.read(template);
    var templateGallery = readerWriter.read('./views/gallery.jade');
    var templateIndex = readerWriter.read('./views/index.jade');

    var fnIframe = jade.compile(templateIframe,{pretty : '\t'});
    var fnGallery = jade.compile(templateGallery,{pretty : '\t'});
    var fnIndex = jade.compile(templateIndex,{pretty : '\t'});

    var stringData = readerWriter.read(file);
    var JSONdata = JSON.parse(stringData);
    console.log('writing : '+target + 'gallery/index.html');
    readerWriter.write(target + 'index.html',fnIndex({data: JSONdata}));
    // for eache component describe in file
    for (var i = 0; i < JSONdata.length; i++) {
        console.log('writing : '+target + 'gallery'+JSONdata[i].name+'.html');
        readerWriter.write(target + 'iframe/'+JSONdata[i].name+'.html',fnIframe(JSONdata[i]));
        readerWriter.write(target + 'gallery/'+JSONdata[i].name+'.html',fnGallery(JSONdata[i]));
    }
};

exports.generate = generate;