/*global require, expect, describe, it*/
/*jslint node: true*/
'use strict';

var tools = require('../../tasks/lib/tools.js');
var title = 'readerWriter.js';
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
    it ('Test of sorting dependencies and inherit', function() {
        var unsorted = [{
           dependencies : [
               'bbbb',
               'cccc',
               'aaaa'
           ],
           inherit : [
               'BBBB',
               'aaaa',
               'CCCC',
               'cccc'
           ]
        }];
        var sorted = [{
            dependencies : [
               'aaaa',
               'bbbb',
               'cccc'
           ],
           inherit : [
               'aaaa',
               'BBBB',
               'CCCC',
               'cccc'
           ]
        }];
        expect(tools.sortInformations(unsorted)).toEqual(sorted);
        expect(tools.sortInformations(sorted)).toEqual(sorted);
    });
    it ('Test of applyTitleCallBack', function() {
        var callBack = function(file, name) {
           return name+file;
        };
        
        var info = [{
            name : 'name1',
            file : 'file1'
        },{
            name : 'name2',
            file : 'file2'
        }];
         var expected = [{
            name : 'name1',
            file : 'file1',
            customName : 'name1file1'
        },{
            name : 'name2',
            file : 'file2',
            customName : 'name2file2'
        }];
        expect(tools.applyTitleCallback(info,callBack)).toEqual(expected);
    });

});