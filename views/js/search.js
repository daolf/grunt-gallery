/* global $*/

var allMyComp = $('.thumbnail');
var compNames = [];
var compName, myForm;
/* get all comp names*/
for (var i = 0; i<allMyComp.length; i++) {
    compName = allMyComp.eq(i).children().eq(0).children('.compName').text();
    compNames.push(compName);
}


/* search through the thumbnail for a comp name in particular
 *
 * @param search    the String we search
 *
 * return nothing but display only element with name mathing with search
 */
var searchInThumbnail = function(search) {
    console.log('searc...');
    var compName = '';
    for (var i = 0; i<allMyComp.length; i++) {
        compName = allMyComp.eq(i).children().eq(0).children('.compName').text();
        /* if comp name not found we hide it*/
        if (compName.toLowerCase().indexOf(search.toLowerCase()) === -1 ) {
            allMyComp.eq(i).css('display','none');
        }
        /* else we display it*/
        else {
            allMyComp.eq(i).css('display','block');
        }
    }
};

$('.form-search').keyup(function() {
    myForm = $('.form-search');
    var currSearch = myForm.val();
    //console.log('search for'+currSearch);
    searchInThumbnail(currSearch);
});


var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });
 
    cb(matches);
  };
};


$('#scrollable-dropdown-menu .typeahead').typeahead({
    hint: false,
    highlight: true,
    minLength: 1,
},
                          {
    name: 'compNames',
    limit: 100,
    source: substringMatcher(compNames)
});

$('.typeahead').bind('typeahead:select', function (obj,datum) {
    searchInThumbnail(datum); 
});

// to be sure that only one suggestion is higlighted
/*
 * We get the depper div the mouse is on, and add tt-cursor class
 */
$('.tt-menu').on('mouseenter mouseleave mousemove', function() {
    $('.tt-cursor').removeClass('tt-cursor');
    var element = $(':hover');
    if(element.length)
    {
        var domElement = element.eq(element.length - 1);
        domElement.addClass('tt-cursor');
    }
});