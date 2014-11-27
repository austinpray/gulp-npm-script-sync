gulp-npm-script-sync [![Build Status](https://travis-ci.org/austinpray/gulp-npm-script-sync.svg?branch=master)](https://travis-ci.org/austinpray/gulp-npm-script-sync)
====================

Syncs all your gulp tasks into the scripts section of your package.json. `gulp watch`, for instance, can be run as `npm run watch`. npm will use the local gulp inside your `node_modules` folder, so there is no need to install gulp globally to run the tasks.

## install

```
npm install --save-dev gulp-npm-script-sync
```

## Usage

```javascript 
// gulpfile.js
var gulp = require('gulp');
var sync = require('gulp-npm-script-sync');

// your gulpfile contents

sync(gulp);
```
