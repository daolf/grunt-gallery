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

/* recursively extract js file from dir*/
function extractJsFromDir(dir) {
    var jsList = [];
    var currFile;
    var filesInDir = fs.readdirSync(dir);
    for (var i = 0; i<filesInDir.length; i++) {
        currFile = filesInDir[i];
        // if js file
        if (path.extname(currFile) === '.js') {
            jsList.push(dir+'/'+currFile);
        }
        // if directory we recurse
        else if (fs.lstatSync(dir+'/'+currFile).isDirectory()) {
            jsList = jsList.concat(extractJsFromDir(dir+'/'+currFile));
        }
    }
    return jsList;
}

exports.read = read;
exports.write = write;
exports.extractJsFromDir = extractJsFromDir;