var myPath = require('path');
var fs = require('fs');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var success = 0;
var failure = 0;


/* Handling of logs for img generation */
var customOuts = function (stdout,file) {    
    var cli = require('cli-color');
    if (stdout.length === 0) {
        console.log(cli.green(' OK ' + file + '.png'));
        success++;
    }
    else {
        console.log(cli.red(file) + ': ' + stdout);
        failure++;
    }
};


/*
 *  run phantomGenerator
 * @param file      will be the first param passed to phantomGenerator, file we want to generate img from
 * @param target    directory we want to put our img in
 *
 * return nothing
 */
var runPhantom = function(file,target) {    
    var childArgs = [
        myPath.join(__dirname, 'phantomGenerator.js'),
        file,
        target
    ];
    
    customOuts(childProcess.execFileSync(binPath, childArgs,{'encoding' : 'utf8'}),file);
};

/*
 * Simply call runPhantom for all files in originPath 
 * @param originPath    directory of file you want to generate img from
 * @param target      directory you want to put your img in
 *
 * return nothing
 */
var generate = function(originPath, target) {
    var lstFiles = fs.readdirSync(originPath);
    //console.log(lstFiles);

    for (var i=0; i<lstFiles.length; i++) {
        runPhantom(originPath+lstFiles[i],target);
    }
    console.log('Done with '+success+'sucess and '+failure+'failure(s)');
};

exports.generate = generate;