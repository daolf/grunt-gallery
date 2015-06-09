/* the purpose of this file is to generate html files with jade tempates in views */
var jade = require('jade');
var tools = require('./tools.js');
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

    var templateIframe = tools.read(template);
    var templateGallery = tools.read(__dirname+'/../../views/gallery.jade');
    var templateIndex = tools.read(__dirname+'/../../views/index.jade');

    var fnIframe = jade.compile(templateIframe,{pretty : '\t'});
    var fnGallery = jade.compile(templateGallery,{pretty : '\t'});
    var fnIndex = jade.compile(templateIndex,{pretty : '\t'});

    var stringData = tools.read(file);
    var JSONdata = JSON.parse(stringData);
    console.log('writing : '+target + 'gallery/index.html');
    tools.write(target + 'index.html',fnIndex({data: JSONdata}));
    // for eache component describe in file
    for (var i = 0; i < JSONdata.length; i++) {
        console.log('writing : '+target + 'gallery'+JSONdata[i].name+'.html');
        tools.write(target + 'iframe/'+JSONdata[i].name+'.html',fnIframe(JSONdata[i]));
        tools.write(target + 'gallery/'+JSONdata[i].name+'.html',fnGallery(JSONdata[i]));
    }
};

exports.generate = generate;