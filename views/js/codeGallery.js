// Loading full code of component
var fullData;
$.ajax({
    url : '../#{file}',
    dataType: 'text',
    success : function (data) {
        fullData = data;
    }
});

/*tanks to Marijn Haverbeke */
var indentAll = function(cm) { 
    var last = cm.lineCount(); 
    cm.operation(function() { 
        for (var i = 0; i < last; ++i) {
            cm.indentLine(i);
        }
    }); 
}; 

var config = {
    mode:  'javascript',
    lineNumbers: true
};
var myCodeMirrorFull;
var myCodeMirrorEx0 = CodeMirror.fromTextArea(document.getElementById('exCodeTx0'), config);
indentAll(myCodeMirrorEx0);
$('#tabExample0').on('shown.bs.tab', function (e) {
    if (myCodeMirrorEx0 instanceof CodeMirror ) {
        myCodeMirrorEx0.refresh();
    } else {
        indentAll(myCodeMirrorEx0);
    }
});

$('#tabFullCode').on('shown.bs.tab', function (e) {
    if (myCodeMirrorFull instanceof CodeMirror ) {
        myCodeMirrorFull.refresh();
    } else {
        $('#fullCodeTx').text(fullData);
        myCodeMirrorFull = CodeMirror.fromTextArea(document.getElementById('fullCodeTx'), config);
    }
});
$('.btnNewWindow').click( function () {
    var windowFullCode = window.open('../js/comp/#{name}.js', 'wFormx', 'width=800,height=600,location=no,menubar=no,status=no,titilebar=no,resizable=no,');
    var fullCode = document.getElementById('fullCodeTx'); // jshint ignore:line
    windowFullCode.onload = function() {
        console.log('yolo');
    };
});