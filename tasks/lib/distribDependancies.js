module.exports = {
    /* list of dependencies for the future index.html of the gallery*/
    index : {
        js : ['./node_modules/jquery/dist/jquery.js',
              './node_modules/typeahead.js/dist/typeahead.bundle.min.js',
              './node_modules/bootstrap/dist/js/bootstrap.min.js',
              './views/js/search.js'],
        css : ['./node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
               './node_modules/bootstrap/dist/css/bootstrap.min.css',
               './views/css/index.css'],
    },
    /* list of dependencies for the future page component pages of the gallery */
    gallery : {
        js : ['./node_modules/jquery/dist/jquery.js',
              './node_modules/codemirror/lib/codemirror.js',
              './node_modules/bootstrap/dist/js/bootstrap.min.js',
              './node_modules/codemirror/mode/javascript/javascript.js'],
        
        css : ['./node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
               './node_modules/bootstrap/dist/css/bootstrap.min.css',
               './node_modules/codemirror/lib/codemirror.css',
               './views/css/gallery.css'],
    }
};