/*global require, expect, describe, it*/
/*jslint node: true*/
'use strict';

var tools = require('../../tasks/lib/tools.js');
var title = 'tools.js';
var fs = require('fs');

describe(title, function () {
    it('Test of read', function() {
        expect(tools.read('./test/dummy.txt')).toEqual('For the test');
    });
    
    it('Test of write', function() {
        tools.write('./test/dummy2.txt','This is it');
        expect(tools.read('./test/dummy2.txt')).toEqual('This is it');
            
    });
    it('Test of recursive search of js files', function() {
        tools.extractJsFromDir('./test/fakedir','./test/expected/extractJS');
        expect(fs.readdirSync('./test/expected/extractJS')).toEqual([ '1.js', '2.js' ] );
    });
});