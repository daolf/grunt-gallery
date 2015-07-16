/*
 * sort inherit and dependencies of informations previously extracted
 * @param extracted information
 * @return sorted information
 */
function sortInformations( extractedInformations ) {
    // credits goes to ron tornambe
    var casInsensitiveSort = function(a, b) {
        if (a.toLowerCase() < b.toLowerCase()) {return -1;}
        if (a.toLowerCase() > b.toLowerCase()) {return 1;}
        return 0;
    };
    return extractedInformations.map( function(curr) {
        curr.dependencies = curr.dependencies.sort( casInsensitiveSort );
        curr.inherit = curr.inherit.sort( casInsensitiveSort );
        return curr;
    });
}

function applyTitleCallback (extractedInformations, callback) {
    return extractedInformations.map( function (curr) {
        curr.customName = callback(curr.file, curr.name);
        return curr;
    });
}

function computeJson (extractedInformations, callback) {
    //We apply callback for custom component name if callback is defined
    if (callback) {
        extractedInformations = applyTitleCallback(extractedInformations, callback);
    }
    //We order alphabetically 
    return sortInformations(extractedInformations);
}

module.exports = {
    sortInformations : sortInformations,
    applyTitleCallback : applyTitleCallback,
    computeJson : computeJson
};