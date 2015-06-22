var esprima = require('esprima');
var estraverse = require('estraverse');

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
 * Clean extrated comment by removing useles tab and * in beginning of line and changing all \r\n to \n
 * @param comment   comment we want to clean
 *
 * @return cleanText    comments cleaned
 */
var cleanComment = function (comment) {
    // removing * in begining of line
    var regexp = /^[\s*\*\s*]*/gm;
    var cleanText = comment.replace(regexp,'');
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
 * Extract example of an ast, for the extraction to work examples need :
 *         - to be preceded by @example 
 *         - to be in a commentary block style, NOT line style
 *         - to be ended with either a close block comment or with another javadoc
 *         marker '@dummy'
 * @param ast       the ast we want to extract information from 
 *
 * @return          array of extractec examples
 */
var extractExamplesFromAst = function (ast) {
    var extractedExamples = [];
    /* see wiki for explanation*/
    var regExp = /(?:@example[\r\n|\n|\s+])([^@]*)/g;
    var computedRegExp;
    var txt;
    estraverse.traverse(ast, {
        enter: function(node,parent) {
            if (node.hasOwnProperty('comments')) {
                for (var i=0; i<node.comments.length ; i++) {
                    if (node.comments[i].type === 'Block' &&
                        node.comments[i].value.search('@example') !== -1 ) {
                        txt = node.comments[i].value;
                        computedRegExp = regExp.exec(txt);
                        while (computedRegExp !== null) {
                            extractedExamples.push(computedRegExp[1]);
                            computedRegExp = regExp.exec(txt);
                        }
                    }
                }
            }
        }
    });
    return extractedExamples;
};

/*
 *  Extract raw examples from plain code 
 *  @param text     raw text we want to extract comments from
 *
 *  @return         array of comment
 */
var extractRawExamples = function (text) {
    var ast = generateAst(text);
    var examples = extractExamplesFromAst(ast);
    return examples;
};

/*
 *  Extract clean examples from plain code 
 *  @param text     raw text we want to extract comments from
 *
 *  @return         array of comment
 */
var extractCleanExamples = function (code) {
    var ast = generateAst(code);
    var examples = extractExamplesFromAst(ast);
    for (var i=0; i<examples.length; i++) {
        examples[i] = cleanComment(examples[i]);
    }
    return examples;
};


/*
 * Trim extension of a filename
 * @param filename
 *
 * @return          filename without extension
 */
var removeExtension = function (filename) {
    parts = filename.split('.');
    return parts[0];
};

/*
 *  Extract information in the code from regexp object
 */
var extractWithRegexps = function( regExps, rawCode ) {
    var inherit = "";
    var result = {
        inherit : ""
    };
    if (regExps !== undefined && regExps.inherit !== undefined ) {  
        //we extract inherit by recreating regexp
        inherit = new RegExp(regExps.inherit.pattern, regExps.inherit.flags).exec(rawCode);
        if (inherit && inherit.length > 1 ) {
            // first element is the whole maching text, with non capturing group, we dont want it
            result.inherit = inherit.slice(1);
        }
    }
    return result;
};



exports.generateAst = generateAst;
exports.extractExamplesFromAst = extractExamplesFromAst;
exports.extractRawExamples = extractRawExamples;
exports.extractCleanExamples = extractCleanExamples;
exports.removeExtension = removeExtension;
exports.cleanComment = cleanComment;
exports.extractWithRegexps = extractWithRegexps;
