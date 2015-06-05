var fs = require("fs");

/*
 * @param inputFiles    an array of path of files you want to concat
 * @param target        path of the output file
 */
var concatFiles = function(inputFiles,target) {
    var output = '';
    for(var i=0; i<inputFiles.length ;i++) {
        var buff = fs.readFileSync(inputFiles[i],'utf8');
        output = output.concat(buff);
    }
    fs.writeFileSync(target,output);
};

exports.concatFiles = concatFiles;
