$.ajax({
    url : './info.json',
    dataType: 'text',
    success: function(data) {
        var info = JSON.parse(data);
        info.filter(function (elem) {
			delete elem.example;
			delete elem.file;
		});
        var allMyComp = $('.thumbnail');
        var compNamesFeeder = [];
        var inheritFeeder = [];
        var dependenciesFeeder = [];
		$('.form-name').val('');
        $('.form-inherit').val('');
        $('.form-dependencies').val('');
        
        var removeDuplicate = function (array) {
            return array.reduce(function(accum, current) {
                if (accum.indexOf(current) < 0) {
                    accum.push(current);
                }
                return accum;
            }, []);
        };
		
		var intersectArray = function (array1, array2) {
			var t;
			if (array2.length > array1.length) {
                t = array2;
                array2 = array1;
                array1 = t; 
            }// indexOf to loop over shorter
			return array1.filter(function (current) {
				if (array2.indexOf(current) !== -1) {
                    return true;
                }
			});
		};
        
        /* get all comp names*/
        for (var i = 0; i<info.length; i++) {
            if (info[i].customName) {
				info[i].name = info[i].customName;
			}
            compNamesFeeder.push(info[i].name);
            inheritFeeder = inheritFeeder.concat(info[i].inherit);
            dependenciesFeeder = dependenciesFeeder.concat(info[i].dependencies);
        }
        
        dependenciesFeeder = removeDuplicate(dependenciesFeeder);
		inheritFeeder = removeDuplicate(inheritFeeder);		
        /*
         * We extract component names where their inherit match the search
         */
        var extractCompNamesFromInheritSearch = function (search) {
            // if search is empty we return all component names
			if (search === '' || search === undefined) {
				return compNamesFeeder;
			}
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
            // if search is empty we return all component names
			if (search === '' || search === undefined) {
				return compNamesFeeder;
			}
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
			var found = false;
			if ($('#emptyResult')) {
				$('#emptyResult').remove();
			}
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
					found = true;
				}
            }
			// if no comp to display we explicitely say it
			if(!found) {
				$('.galleryContainer').append('<h2 id=\'emptyResult\'> Sorry, no result for <strong>\'' + $('.form-search').val() + '\'</strong> </h2>');
			}
			
        };

        var search = function (dataName, dataInherit, dataDependencies) {
            var resultFromNames = extractCompNamesFromNamesSearch(dataName) ;
			var resultFromInherit = extractCompNamesFromInheritSearch(dataInherit) ;
            var resultFromDependencies = extractCompNamesFromDependenciesSearch(dataDependencies) ;
			//console.log('datas ' + resultFromNames +', --- '+resultFromInherit+', --- '+resultFromDependencies+', ');
			compList = intersectArray(resultFromNames, resultFromDependencies);
			//console.log('list1 '+compList);
			compList = intersectArray(compList, resultFromInherit);
			//console.log('list2 '+compList);
            displayComponents(compList);
        };

        var searchFromValueInForms = function () {
            var nameSearch = $('.form-name').val();
            var inheritSearch = $('.form-inherit').val();
            var dependenciesSearch = $('.form-dependencies').val();
			//console.log('search for :'+nameSearch+' ,'+inheritSearch+' ,'+dependenciesSearch);
            search(nameSearch, inheritSearch, dependenciesSearch);
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
		var config = {
            hint: false,
            highlight: true,
            minLength: 1
        };
        $('#scrollable-dropdown-menu .typeahead').typeahead(config,{
            name: 'compNames',
            limit: 100,
            source: substringMatcher(compNamesFeeder)
        });

        $('.form-search').keyup(function (e) {
            //if enter is hit we lose focus
            if (e.keyCode === 13 ) {
                $('.form-search').blur();
            } else {
                searchFromValueInForms();
            }
        });

        $('.typeahead').bind('typeahead:select', function (obj,datum) {
            search(datum); 
        });

        // to be sure that only one suggestion is higlighted
        /*
         * We get the deeper div the mouse is on, and add tt-cursor class
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
		
		$('.tt-cursor').on('click', function() {
			console.log('click');
			$('.typeahead').typeahead('close');
		});

        $('.form-name').keyup( function() {
			searchFromValueInForms();
		});
		
		$('.form-inherit').keyup( function() {
			searchFromValueInForms();
		});
		
		$('.form-dependencies').keyup( function() {
			searchFromValueInForms();
		});
    }
});