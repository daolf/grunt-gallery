/*global require, expect, describe, it*/
/*jslint node: true*/
'use strict';
var parser = require('../../tasks/lib/parser.js');

describe('Test with one example per bloc', function () {
    it('Test of simple example', function() {
        var simpleComment = '/**\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n');
    });

    it('Test of multiline example', function() {
        var simpleComment = '/*\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '* var b = 5;\n' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n'+'* var b = 5;\n');
    });

    it('Test of multiline with different spacing example', function() {
        var simpleComment = '/**\n' +
            '* @info\n' +
            '* var a = 0;\n' +
            '*   var b = 5;\n' +
            '* \n' +
            '*    var c = 50 \n' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@info');
        expect(comments[0]).toEqual('* var a = 0;\n'+
                                    '*   var b = 5;\n'+
                                    '* \n'+
                                    '*    var c = 50 \n');
    });

    it('Test of simple example with javadoc ending', function() {
        var simpleComment = '/**\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '* @misc' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n* ');
    });

    it('Test of multiline example with javadoc ending', function() {
        var simpleComment = '/**\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '* var b = 5;\n' +
            '* @misc' +
            '**/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n'+'* var b = 5;\n* ');
    });

    it('Test of multiline with different spacing example with javadoc ending', function() {
        var simpleComment = '/**\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '*   var b = 5;\n' +
            '* \n' +
            '*    var c = 50 \n' +
            '* @misc' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n'+
                                    '*   var b = 5;\n'+
                                    '* \n'+
                                    '*    var c = 50 \n* ');
    });

    it('Test of multiline with different spacing example with multi javadoc ending', function() {
        var simpleComment = '/**\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '*   var b = 5;\n' +
            '* \n' +
            '*    var c = 50 \n' +
            '* @misc \n' +
            '* \n' +
            '* @misc2' +
            '**/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n'+
                                    '*   var b = 5;\n'+
                                    '* \n'+
                                    '*    var c = 50 \n* ');
    });

    it('Test of multiline with different spacing example with multi javadoc ending', function() {
        var simpleComment = '/**\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '*   var b = 5;\n' +
            '* \n' +
            '*    var c = 50 \n' +
            '* @misc \n' +
            '* @misc2' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n'+
                                    '*   var b = 5;\n'+
                                    '* \n'+
                                    '*    var c = 50 \n* ');
    });

    it('Test of multiline with different spacing example with multi javadoc ending /* block comment ', function() {
        var simpleComment = '/*\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '*   var b = 5;\n' +
            '* \n' +
            '*    var c = 50 \n' +
            '* @misc \n' +
            '* @misc2' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n'+
                                    '*   var b = 5;\n'+
                                    '* \n'+
                                    '*    var c = 50 \n* ');
    });

    it('Test of simple example with /* */ block comment', function() {
        var simpleComment = '/*\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n');
    });

    it('Test of multiline example with javadoc ending and /* block comment', function() {
        var simpleComment = '/*\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '* var b = 5;\n' +
            '* @misc' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n'+'* var b = 5;\n* ');
    });
});

describe('Test with several example per bloc', function () {
    it('Test with two example in a row', function () {
        var simpleComment = '/*\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '* @example\n' +
            '* var b = 5;\n' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n* ');
        expect(comments[1]).toEqual('* var b = 5;\n');
    });

    it('Test with 2 example in a row with useles thing betwwen them', function () {
        var simpleComment = '/*\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '* @useless' +
            '* useless thing' +
            '* useless thing' +
            '* @example\n' +
            '* var b = 5;\n' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n* ');
        expect(comments[1]).toEqual('* var b = 5;\n');
    });

    it('Test with 3 example in a row with useles thing betwwen them', function () {
        var simpleComment = '/*\n' +
            '* @example\n' +
            '* var a = 0;\n' +
            '* @useless' +
            '* useless thing' +
            '* useless thing' +
            '* @example\n' +
            '* var b = 5;\n' +
            '* @useless' +
            '* useless thing' +
            '* @example\n' +
            '* var c = 7;\n' +
            '*/';
        var comments = parser.extractRawInfos(simpleComment, '@example');
        expect(comments[0]).toEqual('* var a = 0;\n* ');
        expect(comments[1]).toEqual('* var b = 5;\n* ');
        expect(comments[2]).toEqual('* var c = 7;\n');
    });


});

describe('Test of removeExtension', function() {
    it('Test with a.json', function() {
        var fileName = 'a.json';
        var extractedFilename = parser.removeExtension(fileName);
        expect(extractedFilename).toEqual('a');
    });

    it('Test with abcd.js', function() {
        var fileName = 'abcd.json';
        var extractedFilename = parser.removeExtension(fileName);
        expect(extractedFilename).toEqual('abcd');
    });

    it('Test with dummy', function() {
        var fileName = 'dummy';
        var extractedFilename = parser.removeExtension(fileName);
        expect(extractedFilename).toEqual('dummy');
    });

    it('Test with array.js.jpeg.js', function() {
        var fileName = 'array.js.jpeg.js';
        var extractedFilename = parser.removeExtension(fileName);
        expect(extractedFilename).toEqual('array');
    }); 

});

describe('Test of cleanInfo', function() {
    it ('Test with single line Info with multiple spacing in the begining', function() {
        var Info = '* var a = 5;';
        var Info2 = '  * var b = 5;';
        var Info3 = ' *var c = 6;';
        
        expect(parser.cleanInfo(Info)).toEqual('var a = 5;');
        expect(parser.cleanInfo(Info2)).toEqual('var b = 5;');
        expect(parser.cleanInfo(Info3)).toEqual('var c = 6;');
    });
    
    it ('Test with multiline Info with multiple spacing in the begining', function() {
        var Info =   '* var a = 5;\n' +
                        '  * var b = 5;\n' +
                        ' *var c = 6;';
        
        expect(parser.cleanInfo(Info)).toEqual('var a = 5;\nvar b = 5;\nvar c = 6;');
    });
    
    it ('Test with multiline Info with multiple spacing in the begining and \r\n at the end', function() {
        var Info =   '* var a = 5;\r\n' +
                        '  * var b = 5;\r\n' +
                        ' *var c = 6;';
        
        expect(parser.cleanInfo(Info)).toEqual('var a = 5;\nvar b = 5;\nvar c = 6;');
    });
    
    it ('Test with lonely *', function() {
        var Info =   '* var a = 5;\r\n' +
                        '  * \n' +
                        ' *var c = 6;';
        
        expect(parser.cleanInfo(Info)).toEqual('var a = 5;\nvar c = 6;');
    });
    
    it ('Test with mutiple lonely *', function() {
        var Info =   '* var a = 5;\r\n' +
                        '  * \n' +
                        '*\n' +
                        ' *var c = 6;';
        
        expect(parser.cleanInfo(Info)).toEqual('var a = 5;\nvar c = 6;');
    });
    
    it ('Test removal of trailing white space', function () {
        var Info =   '* var a = 5;\r\n\t\n';
        var Info2 = '* var a = 5;\n * var b = 6;  \n';
        expect(parser.cleanInfo(Info)).toEqual('var a = 5;');
        expect(parser.cleanInfo(Info2)).toEqual('var a = 5;\nvar b = 6;');
    });
});

describe( 'Test of extractClean info', function() {
    it('Test with dummy commit with @info, @example and @tags', function() {
        var rawCode = '/*\n' +
                         '* @example\n' +
                         '* React.render(\n' +
                         '*     React.createElement(MenuExample, {items:  [\'Home\', \'Services\', \'About\', \'Contact us\'] }),\n' +
                         '*     document.body\n' +
                         '* );\n' +
                         '*\n' +
                         '* @tags\n' +
                         '* bonjour, hello \n' +
                         '*\n' +
                         '*\n' +
                         '* @info \n' +
                         '* random info \n' +
                         '*\n' +
                         '*/';
        var info = parser.extractCleanInfos(rawCode, '@info');
        var tags = parser.extractCleanInfos(rawCode, '@tags');
        expect(info).toEqual([ 'random info' ]);
        expect(tags).toEqual([ 'bonjour, hello' ]);
    });
});

describe( ' Test of extractedWithRegexp', function () {
    var regExps = {
        inherit : {
            pattern : '(?:Ext.extend\\()(.*),',
            flags : 'g'
        }
    };
    it ('Test with 1 inheritance', function () {
        var rawText = " blablabla \n blabla\n Lyra.DatePicker = Ext.extend(Ext.DatePicker, { \n blabla };";
        var result = parser.extractWithRegexps( regExps, rawText);
        expect(result.inherit).toEqual(["Ext.DatePicker"]);
    });
    it ('Test with 0 inheritance', function () {
        var rawText = " blablabla \n blabla\n Lyra.DatePicker =  { \n blabla };";
        var result = parser.extractWithRegexps( regExps, rawText);
        expect(result.inherit).toEqual([ ]);
    });
    it ('Test with 2 inheritance', function () {
            var rawText = " blablabla  Lyra.DatePicker = Ext.extend(Ext.DatePicker1, { \n blabla }; \n blabla\n  Lyra.DatePicker = Ext.extend(Ext.DatePicker2, { \n blabla }; blabla };";
            var result = parser.extractWithRegexps( regExps, rawText);
            expect(result.inherit).toEqual(["Ext.DatePicker1","Ext.DatePicker2"]);
        });
});

describe (' Test of extractCleanInfo', function() {
    it ('Test with @info tag', function () {
        expect(parser.extractCleanInfos('/*\n* @info\n * blabla\n */', '@info')).toEqual(['blabla']); 
    });
});


describe( ' Test of extractDependencies', function () {
    it ('Test with 1 dependencies', function () {
        var rawText = " blablabla \n blabla\n require('comp.js') , { \n blabla };";
        var result = parser.extractDependencies(rawText);
        expect(result).toEqual(["comp.js"]);
    });
    it ('Test with 0 dependencies', function () {
        var rawText = " blablabla \n blabla\n Lyra.DatePicker =  { \n blabla };";
        var result = parser.extractDependencies(rawText);
        expect(result).toEqual([ ]);
    });
    it ('Test with 2 dependencies', function () {
            var rawText = " blablabla  require('comp1.js'), { \n blabla }; \n blabla\n  require ('./ahz./lol/comp2.js'), { \n blabla }; blabla };";
            var result = parser.extractDependencies(rawText);
            expect(result).toEqual(["comp1.js","comp2.js"]);
    });
});




