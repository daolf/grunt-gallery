/* global $*/

/* reading JSON files*/
var info = $.ajax({
    url : "./info.json",
    dataType: "text",
    async: false
}).responseText;

info = JSON.parse(info);

var allMyComp = $('.thumbnail');
var compNames = [];
var myForm;
var criteria = "NAME";
/* get all comp names*/
for (var i = 0; i<info.length; i++) {
    compNames.push(info[i].name);
}

/*
 * We extract component names where their inherit match the search
 */
var extractCompNamesFromInheritSearch = function (search) {
    var result = [];
    var currInherit;
    for (var i = 0; i<info.length; i++) {
        currInherit = info[i].inherit;
        for (var j = 0; j<currInherit.length; j++) {
            if ( currInherit[j].toLowerCase().indexOf(search.toLowerCase()) !== -1 ) {
                result.push(info[i].name);
            }
        }
    }
    return result;
};

/*
 * We extract component names where their dependencies match the search
 */
var extractCompNamesFromDependenciesSearch = function (search) {
    var result = [];
    var currDependencies;
    for (var i = 0; i<info.length; i++) {
        currDependencies = info[i].dependencies;
        for (var j = 0; j<currDependencies.length; j++) {
            if ( currDependencies[j].toLowerCase().indexOf(search.toLowerCase()) !== -1 ) {
                result.push(info[i].name);
            }
        }
    }
    return result;
};

/*
 * We extract component names where their names match the search
 */
var extractCompNamesFromNamesSearch = function (search) {
    var result = [];
    for (var i = 0; i<info.length; i++) {
        if ( info[i].name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ) {
                result.push(info[i].name);
        }
    }
    return result;
};

/*
 * We only display components whose names are in compList
 */
var displayComponents = function (compList) {
    var compName;
    for (var i = 0; i<allMyComp.length; i++) {
        // very very ugly !!!
        compName = allMyComp.eq(i).children().eq(0).children().eq(1).children().eq(0).children().eq(0).text();
        /* if comp name not found we hide it*/
        if (compList.indexOf(compName) === -1 ) {
            allMyComp.eq(i).css('display','none');
        }
        /* else we display it*/
        else {
            allMyComp.eq(i).css('display','block');
        }
    }
};

var search = function (data) {
    var compList;
    switch (criteria) {
        case "NAME" :
            compList = extractCompNamesFromNamesSearch(data);
            break;
        case "INHERIT" :
            compList = extractCompNamesFromInheritSearch(data);
            break;
        case "DEPENDENCIES" :
            compList = extractCompNamesFromDependenciesSearch(data);
            break;
    }
    displayComponents(compList);
};

var searchFromValueInForm = function () {
    myForm = $('.form-search');
    var currSearch = myForm.val();
    search(currSearch);
};

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

///////////////////
// Event binding //
///////////////////

$('#scrollable-dropdown-menu .typeahead').typeahead({
    hint: false,
    highlight: true,
    minLength: 1,
},{
    name: 'compNames',
    limit: 100,
    source: substringMatcher(compNames),
});

$('.form-search').keyup(function (e) {
    //if enter is hit we lose focus
    if (e.keyCode === 13 ) {
        $('.form-search').blur();
    } else {
        searchFromValueInForm();
    }
});

$('.typeahead').bind('typeahead:select', function (obj,datum) {
    search(datum); 
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

$('#nameSearch').on('shown.bs.tab', function () {
    criteria = "NAME";
    searchFromValueInForm();
});

$('#inheritSearch').on('shown.bs.tab', function () {
    criteria = "INHERIT";
    searchFromValueInForm();
});

$('#dependenciesSearch').on('shown.bs.tab', function () {
    criteria = "DEPENDENCIES";
    searchFromValueInForm();
});



