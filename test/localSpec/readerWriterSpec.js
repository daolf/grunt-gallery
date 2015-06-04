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
    

});