var fs = require('fs');
var myReaderWriter = require('./readerWriter.js');
var myParser = require('./parser.js');
var galleryGenerator = require('./galleryGenerator.js');
var screenShotGenerator = require('./screenShotGenerator');

var componentPath = './comp/';
var targetPath = './target/info.json';
var template = '';
var components;
var extractedExamples = [];
var rawCode;
var fileName;

var usage = function () {
    console.log('usage :');
    console.log('main.js <component dir> <template>');
    console.log('\t html in /target/gallery');
    console.log('\t img in /target/img');
    console.log('\t json in /target/info.json');
    console.log('\t index in /target/index.html');
};


if (process.argv.length !== 4) {
    usage();
    process.exit();
}

componentPath = process.argv[2]+'/';
template = process.argv[3];

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
    stats = fs.lstatSync('./target/gallery');
}
catch (e) {
    //if not we create it
    console.log('creating dir /target/gallery');
    fs.mkdirSync('./target/gallery/');
}

//We read the comp directory looking for component
components = myReaderWriter.extractJsFromDir(componentPath);
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
console.log('Writing result in '+targetPath);
//We write result in JSON in /target/examples.json
myReaderWriter.write(targetPath, JSON.stringify(extractedExamples));
// We now generate galery
console.log('Now generating gallery');
galleryGenerator.generate(targetPath,template);
console.log('Now generating screenshot');
screenShotGenerator.generate('./target/iframe/','./target/img/');