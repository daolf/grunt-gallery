/*global require*/
/*jslint node: true*/
'use strict';

var fs = require('fs');

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(file, data) {
    fs.writeFileSync(file, data);
}

exports.read = read;
exports.write = write;