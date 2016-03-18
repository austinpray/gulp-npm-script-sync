gulp-npm-script-sync [![Build Status](https://travis-ci.org/austinpray/gulp-npm-script-sync.svg?branch=master)](https://travis-ci.org/austinpray/gulp-npm-script-sync)
====================

Syncs all your gulp tasks into the scripts section of your package.json. For instance: `gulp watch` can be run as `npm run watch`. npm will use the local gulp inside your `node_modules` folder, so there is no need to install gulp globally to run the tasks. [inspired by this stackoverflow question.](http://stackoverflow.com/a/27166589/1585343)

## install

```
npm install --save-dev gulp-npm-script-sync
```

## usage

```javascript 
// gulpfile.js
var gulp = require('gulp');
var sync = require('gulp-npm-script-sync');

// your gulpfile contents

sync(gulp);
```

Using the configurations:
```javascript
// gulpfile.js
var gulp = require('gulp');
var sync = require('gulp-npm-script-sync');

// your gulpfile contents

sync(gulp, {
  path: 'path/to/package.json',
  excluded: ['task1', 'task2']
});
```
