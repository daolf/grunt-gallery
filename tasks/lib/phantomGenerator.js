/* This module simply run a phantomjs cmd for generating one picture 
 * Usage
 *  phantomGenerator.js <sourceFile> <destPath>
 */

var webPage = require('webpage');
var page = webPage.create();
var system = require('system');

/* from phantom js doc */
page.onError = function(msg, trace) {
    var msgStack = ['ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function(t) {
            /* jshint ignore:start */
            msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
            /* jshint ignore:end */
        });
    }
    console.error(msgStack.join('\n'));
    phantom.exit();
};

/* from phantom js doc */
page.onResourceError = function(resourceError) {
    console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
    console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    phantom.exit();
};

var getFilename = function(path) {
    return path.replace(/^.*[\\\/]/, '');
};


page.open(system.args[1], function start(status) {
    page.evaluate(function() {
        document.body.bgColor = 'white';
    });
    
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit();
    } else {
        window.setTimeout(function () {
            page.render(system.args[2]+getFilename(system.args[1])+'.png', {format: 'png', quality: '100'});
            phantom.exit();
        }, 600); // Timeout to be sure that all ressources had been loaded
    }
});