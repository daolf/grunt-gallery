/*global console, require*/
/*jslint node: true*/
'use strict';

var fs = require('fs');

function read(file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            return data;
        }
    });
}

function write(data, file) {
    fs.writeFile(file, data, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log('successfully writing in ' + file);
        }
    });
}

exports.read = read;
exports.write = write;