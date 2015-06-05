module.exports = {
    /* list of dependencies for the future index.html of the gallery*/
    index : {
        js : [__dirname+'/../../node_modules/jquery/dist/jquery.js',
              __dirname+'/../../node_modules/typeahead.js/dist/typeahead.bundle.min.js',
              __dirname+'/../../node_modules/bootstrap/dist/js/bootstrap.min.js',
              __dirname+'/../../views/js/search.js'],
        css : [__dirname+'/../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
               __dirname+'/../../node_modules/bootstrap/dist/css/bootstrap.min.css',
               __dirname+'/../../views/css/index.css'],
    },
    /* list of dependencies for the future page component pages of the gallery */
    gallery : {
        js : [__dirname+'/../../node_modules/jquery/dist/jquery.js',
              __dirname+'/../../node_modules/codemirror/lib/codemirror.js',
              __dirname+'/../../node_modules/bootstrap/dist/js/bootstrap.min.js',
              __dirname+'/../../node_modules/codemirror/mode/javascript/javascript.js'],

        css : [__dirname+'/../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
               __dirname+'/../../node_modules/bootstrap/dist/css/bootstrap.min.css',
               __dirname+'/../../node_modules/codemirror/lib/codemirror.css',
               __dirname+'/../../views/css/gallery.css'],
    }
};