/*global require, expect, describe, it*/
/*jslint node: true*/
'use strict';

var jsonTools = require('../../tasks/lib/jsonTools.js');
var title = 'jsonTools.js';

describe(title, function () {
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
        expect(jsonTools.sortInformations(unsorted)).toEqual(sorted);
        expect(jsonTools.sortInformations(sorted)).toEqual(sorted);
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
        expect(jsonTools.applyTitleCallback(info,callBack)).toEqual(expected);
    });

});