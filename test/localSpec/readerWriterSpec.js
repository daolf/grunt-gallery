/*global require, expect, describe, it*/
/*jslint node: true*/
'use strict';

var myReaderWriter = require('../../tasks/lib/readerWriter.js');
var title = 'readerWriter.js';

describe(title, function () {
    it('Test of read', function() {
        expect(myReaderWriter.read('./test/dummy.txt')).toEqual('For the test');
    });
    
    it('Test of write', function() {
        myReaderWriter.write('./test/dummy2.txt','This is it');
        expect(myReaderWriter.read('./test/dummy2.txt')).toEqual('This is it');
            
    });
    it('Test of recursive search of js files', function() {
        expect(myReaderWriter.extractJsFromDir('./test/localSpec')).toEqual([ './test/localSpec/parserSpec.js', './test/localSpec/readerWriterSpec.js' ]);
        expect(myReaderWriter.extractJsFromDir('./test/fakedir')).toEqual( [ './test/fakedir/fakedir2/2.js', './test/fakedir/fakedir2/fakedir3/fakedir4/1.js' ]);
        
    })
    

});