/* the purpose of this file is to generate html files with jade tempates in views */
var jade = require('jade');
var tools = require('./tools.js');
var path = require('path');
var fs = require('fs');


/*
 * Extract information for each component (filepath) in input
 * 
 * @param componentsPath     array of filePath of grphic component
 * @param parser             parser we use to extract information
 * @return extractedExamples    Array containing all the information we want about previously given components
 */
var extractInformation = function(componentsPath, regExps, myParser) { 
    var fileName;
    var rawCode;
    var resultRegexp;
    var extractedInformation = [];
    var components = fs.readdirSync(componentsPath);
    //We extract example for each of them
    console.log('Extraction of examples ...');
    for (var j = 0; j<components.length; j++) {
        //console.log('Extraction of '+ components[i]);
        fileName = components[j];
        rawCode = tools.read(path.join( componentsPath, fileName ));
        resultRegexp = myParser.extractWithRegexps( regExps, rawCode );
        var buffer = {
            name : myParser.removeExtension(path.basename(fileName)),
            file : './js/comp/'+fileName,
            example : myParser.extractCleanExamples(rawCode),
            inherit : resultRegexp.inherit, 
            dependencies : myParser.extractDependencies(rawCode)
        };
        //handle component only if there is example
        if ( buffer.example.length > 0 ) {
            extractedInformation.push(buffer);
        }
        //console.log('Extraction of '+ components[i]+ ' done');
    }
    return extractedInformation;
};




/*
 * Generate html page for each item in a JSON file containing folowing fields : example,file and name
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
        tools.write(target + 'iframe/iframe_'+JSONdata[i].name+'.html',fnIframe(JSONdata[i]));
        tools.write(target + 'gallery/'+JSONdata[i].name+'.html',fnGallery(JSONdata[i]));
    }
};

exports.generate = generate;
exports.extractInformation = extractInformation;