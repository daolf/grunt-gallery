/*global require*/
/*jslint node: true*/
'use strict';

var fs = require('fs');
var path = require('path');

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(file, data) {
    fs.writeFileSync(file, data);
}

/* recursively extract js file from dir to put them in a target dir*/
function extractJsFromDir(dir, target) {
    var currFile;
    var buff ;
    var filesInDir = fs.readdirSync(dir);
    console.log(filesInDir);
    for (var i = 0; i<filesInDir.length; i++) {
        currFile = filesInDir[i];
        // if directory we recurse
        if (fs.lstatSync(dir+'/'+currFile).isDirectory()) {
            extractJsFromDir(dir+'/'+currFile,target);
        }
        // if js file
        else if (path.extname(currFile) === '.js') {
            buff = read(dir+'/'+currFile);
            write(target+'/'+currFile,buff);
        }
    }
}

exports.read = read;
exports.write = write;
exports.extractJsFromDir = extractJsFromDir;