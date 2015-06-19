var fs = require('fs');
var path = require('path');
var customCopyDir = require('copy-dir');

// Test is path dir exist 
var testPathDir = function(filepath, grunt) {    
    if (!grunt.file.isDir(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" is not directory.');
        return false;
    } else {
        return true;
    }
};
// Test is path file exist 
var testPathFile = function(filepath, grunt) {    
    if (!grunt.file.isFile(filepath)) {
        grunt.log.warn('Source file "' + filepath + '" is not directory.');
        return false;
    } else {
        return true;
    }
};

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function write(file, data) {
    fs.writeFileSync(file, data);
}

/* recursively extract js file from dir to put them in a target dir*/
function extractJsFromDir(dir, target) {
    var currFile;
    var buff ;
    var filesInDir = fs.readdirSync(dir);
    // console.log(filesInDir);
    for (var i = 0; i<filesInDir.length; i++) {
        currFile = filesInDir[i];
        // if directory we recurse
        if (fs.lstatSync(dir+'/'+currFile).isDirectory()) {
            extractJsFromDir(dir+'/'+currFile,target);
        }
        // if js file
        else if (path.extname(currFile) === '.js') {
            buff = read(dir+'/'+currFile);
            write(target+'/'+currFile,buff);
        }
    }
}


/* copy all files in given target using copy-dir package
 * @input src   file or array of fildes you want to copy
 * @input dest  directory you want to copy your files in 
 */
function customCopyDir(src,dest) {
    if (src !== undefined ){
        if (src instanceof Array) {
            for (var i=0; i<src.length; i++) {
                console.log(src[i]+ ' -> '+dest);
                customCopyDir.sync(src[i],dest);
            }
        }
        else {   
            console.log(src+ ' -> '+dest);
            customCopyDir.sync(src,dest);
        }
    }
}


exports.testPathDir = testPathDir;
exports.testPathFile = testPathFile;
exports.read = read;
exports.write = write;
exports.extractJsFromDir = extractJsFromDir;
exports.customCopyDir = customCopyDir;
