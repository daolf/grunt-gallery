# grunt-gallery

> Generate a web gallery presenting graphic components from various lib (Ext, React, etc...)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gallery --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gallery');
```

## The "gallery" task

### Overview
In your project's Gruntfile, add a section named `gallery` to the data object passed into `grunt.initConfig()`.

```js
  grunt.initConfig({
    gallery: {
      options: {
          //to be designed
      },
      ext : {
        files: {
          src : './privateRessources/extComp',
          dest : './target/'
        },
        template : './views/extComp.jade',
        dependencies : {
          js : ['./privateRessources/extjs.git/src3.4.2/adapter/ext/ext-base-debug.js',
                './privateRessources/extjs.git/src3.4.2/ext-all-debug.js'],
          css : './privateRessources/extjs.git/src3.4.2/resources/css/ext-all.css',
          images : './privateRessources/extjs.git/src3.4.2/resources/images/'

        }
      },
    },
  })
```

### Options

### Files

#### Files.src

The directory containing all the component you want to generate gallery from. Be careful, only put one and only onde directory, multiple source dir is currently not supported.

#### Files.dest

Directory you to put the gallery in.

### Template

The jade template where each component will be rendered

### Dependancies

Write here all the dependancies of your templates, all those files will be later concat in a single file.

## Output directory

```
    \
    |__ iframe/                contains the html only displaying component, generated from template passed in parameter
          |__ comp1.html
          |__ comp2.html
    |__ gallery/               contains the html page with comp enbeded in iframe + other information
          |__ comp1.html
          |__ comp2.html
    |__ images/                contains all the screenshot generated from iframe/
          |__ comp1.html.png
          |__ comp2.html.png
    |__ css/                   contains css concat files 
          |__ gallery.css
          |__ index.css
          |__ iframe.css
    |__ js/                    contains js concat files
          |-- comp/                 copy of components
          |__ gallery.js
          |__ index.js
          |__ iframe.js
    |__ img/                   contains all img dependancies
    |__ fonts
    |__ info.json              contains all the information extracted from components in JSON
    |__ index.html             index of the gallery

```

## Output
 
This is what the output will look like :
![alt text](./doc/index.png "Index page of gallery")

### Features :

* Display interactable component
* Display instanciation code of component
* Hability to search component
* Autocompletion 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Pierre de Wulf. Licensed under the MIT license.
