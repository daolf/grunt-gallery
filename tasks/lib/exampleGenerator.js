/* The purpose of this is to generate random @example tag for all file in /ExtComp */
var fs = require('fs');
var Chance = require('chance');
var chance = new Chance();

var write = function(file) {
    var example =   '/* @example\n' +
                    ' * new Ext.master.Switch({\n'+
                    ' *     text: '+chance.sentence({word : 6})+'\n'+
                    ' *     handler: function() {\n'+
                    ' *     alert(\'You clicked me!\')\n'+
                    ' *     }\n'+
                    ' * });\n';
    var outputStream = fs.createWriteStream('./ExtCompDoc/'+file,{encoding: 'utf8'});
    outputStream.on('pipe', function(chunk) {
        outputStream.write(example);
    });

    return outputStream;
};

var read = function(file) {
    /* Open of a readable Stream */
    var inputStream = fs.createReadStream('./ExtComp/' + file,{ encoding: 'utf8'});
    return inputStream;
};

var generateComment = function(file) {
    read(file).pipe(write(file));
};


fs.readdir('./ExtComp',function(err,files) {
    for (var i = 0; i<files.length - 1; i++ ) {
        generateComment(files[i]);
    }
});