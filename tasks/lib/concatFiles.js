var fs = require("fs");

/*
 * @param inputFiles    an array of path of files, or one file you want to concat
 * @param target        path of the output file
 */
var concatFiles = function(inputFiles,target) {
    var output = '';
    var buff;
    if (inputFiles instanceof Array) {
        for(var i=0; i<inputFiles.length ;i++) {
            buff = fs.readFileSync(inputFiles[i],'utf8');
            output = output.concat(buff);
        }
    } else {
        buff = fs.readFileSync(inputFiles,'utf8');
        output = output.concat(buff);
    }
    fs.writeFileSync(target,output);
};

exports.concatFiles = concatFiles;
