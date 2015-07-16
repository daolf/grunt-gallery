var esprima = require('esprima');
var estraverse = require('estraverse');
var path = require('path');

/*
 * Generate ast from text with esprima
 * @param text      text we want to parse
 * 
 * @return ast
 */
var generateAst = function (text) {
    var ast = esprima.parse(text,{comment : true});
    return ast;
};

/*
 * Clean extrated Info by removing useles tab and * in beginning of line and changing all \r\n to \n
 * @param Info   Info we want to clean
 *
 * @return cleanText    Info cleaned
 */
var cleanInfo = function (Info) {
    // removing * in begining of line
    var regexp = /^[\s*\*\s*]*/gm;
    var cleanText = Info.replace(regexp,'');
    // replacing all \r and \r\n with conventional \n
    var regexp2 = /[\r|\r\n]/gm;
    cleanText = cleanText.replace(regexp2,'\n');
    // removing trailing whitespace
    var regexp3 = /\s/;
    while (regexp3.test(cleanText[cleanText.length - 1]) === true ) {
        cleanText = cleanText.substring(0,cleanText.length - 1);
    }
    return cleanText;
};

/*
 * Extract info of an ast, for the extraction to work infos need :
 *         - to be preceded by @tag 
 *         - to be in a commentary block style, NOT line style
 *         - to be ended with either a close block comment or with another javadoc
 *         marker '@dummy'
 * @param ast       the ast we want to extract information from
 * @param tag       the tag you want to extract information after
 *
 * @return          array of extractec examples
 */
var extractInfosFromAst = function (ast, tag) {
    var extractedInfos = [];
    /* see wiki for explanation*/
    var pattern = '(?:'+tag+'[\\r\\n|\\n|\\s+])([^@]*)';
    var flag = 'g';
    var regExp = new RegExp(pattern, flag);
    var computedRegExp;
    var txt;
    estraverse.traverse(ast, {
        enter: function(node) {
            if (node.hasOwnProperty('comments')) {
                node.comments.map( function(curr) {
                    if (curr.type === 'Block' &&
                        curr.value.search(tag) !== -1 ) {
                        txt = curr.value;
                        computedRegExp = regExp.exec(txt);
                        while (computedRegExp !== null) {
                            extractedInfos.push(computedRegExp[1]);
                            computedRegExp = regExp.exec(txt);
                        }
                    }
                });
            }
        }
    });
    return extractedInfos;
};

/*
 *  Extract raw informations from plain code 
 *  @param text     raw text we want to extract informations from
 *  @param tag      tag you want to extract information after
 *
 *  @return         array of informations
 */
var extractRawInfos = function (text, tag) {
    var ast = generateAst(text);
    var infos = extractInfosFromAst(ast, tag);
    return infos;
};

/*
 *  Extract clean informations from plain code 
 *  @param text     raw text we want to extract informations from
 *  @param tag      tag you want to extract information after
 *
 *  @return         array of comment
 */
var extractCleanInfos = function (code, tag) {
    var ast = generateAst(code);
    var infos = extractInfosFromAst(ast, tag);
    return infos.map( function(curr) {
        return cleanInfo(curr);
    });
};


/*
 * Trim extension of a filename
 * @param filename
 *
 * @return          filename without extension
 */
var removeExtension = function (filename) {
    var parts = filename.split('.');
    return parts[0];
};

/*
 *  Extract information in the code from regexp object
 */
var extractWithRegexps = function( regExps, rawCode ) {
    var inherit = '';
    var inheritRegExp;
    var result = {
        inherit : []
    };
    if (regExps !== undefined && regExps.inherit !== undefined ) {  
        //we extract inherit by recreating regexp
        inheritRegExp = new RegExp(regExps.inherit.pattern, regExps.inherit.flags);
        inherit = inheritRegExp.exec(rawCode);
        while (inherit !== null) {
            result.inherit.push(inherit[1]);
            inherit = inheritRegExp.exec(rawCode);
        }
    }
    return result;
};

/*
 * Extract dependencies , return array of all dependencies
 */
var extractDependencies = function (rawCode) {
    var regExp = /(?:require.*\(.*["|'])(.*)["|']/g;
    var computedRegexp = regExp.exec(rawCode);
    var result = [];
    while (computedRegexp !== null) {
        result.push(path.basename(computedRegexp[1]));
        computedRegexp = regExp.exec(rawCode);
    }
    return result;
};

module.exports = {
    generateAst : generateAst,
    extractInfosFromAst : extractInfosFromAst,
    extractRawInfos : extractRawInfos,
    extractCleanInfos : extractCleanInfos,
    removeExtension : removeExtension,
    cleanInfo : cleanInfo,
    extractWithRegexps : extractWithRegexps,
    extractDependencies : extractDependencies
};