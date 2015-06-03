var allMyComp = $('.thumbnail');
var compNames = [];
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
    console.log('keyUp');
    myForm = $('.form-search');
    var currSearch = myForm.val();
    //console.log('search for'+currSearch);
    searchInThumbnail(currSearch);
});

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
 
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


$('.typeahead').typeahead({
    hint: false,
    highlight: true,
    minLength: 1
},
                          {
    name: 'compNames',
    source: substringMatcher(compNames)
});

/*$('.typeahead').bind('typeahead:select', function (obj,datum, name) {
    searchInThumbnail(datum); 
    console.log('typeahead:select');
});

$('.typeahead').bind('typeahead:cursorchange', function (obj,datum, name) {
    searchInThumbnail(datum); 
    console.log('typeahead:cursorchange');
});

$('.typeahead').bind('typeahead:close', function (obj,datum, name) {
    console.log('typeahead:close');
    searchInThumbnail(datum); 
});

$('.typeahead').bind('typeahead:change', function (obj,datum, name) {
    console.log('typeahead:change');
    searchInThumbnail(datum); 
});*/