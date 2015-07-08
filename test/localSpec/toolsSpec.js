/*global require, expect, describe, it*/
/*jslint node: true*/
'use strict';

var myReaderWriter = require('../../tasks/lib/tools.js');
var title = 'readerWriter.js';
var fs = require('fs');

describe(title, function () {
    it('Test of read', function() {
        expect(myReaderWriter.read('./test/dummy.txt')).toEqual('For the test');
    });
    
    it('Test of write', function() {
        myReaderWriter.write('./test/dummy2.txt','This is it');
        expect(myReaderWriter.read('./test/dummy2.txt')).toEqual('This is it');
            
    });
    it('Test of recursive search of js files', function() {
        myReaderWriter.extractJsFromDir('./test/fakedir','./test/expected/extractJS');
        expect(fs.readdirSync('./test/expected/extractJS')).toEqual([ '1.js', '2.js' ] );
    });
    

});