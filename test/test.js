/* jshint node: true */
/* global describe, it, beforeEach, afterEach */
'use strict';

var assert = require('chai').assert;
var a = require('assert');
var fs = require('fs');
var mkdirp = require('mkdirp');
var gulp = require('gulp');

var sync = require('../index');

function addTasks(done) {
  mkdirp('test/tmp/', function () {
    fs.writeFileSync('test/tmp/package.json', fs.readFileSync('test/fixtures/package.json'));
    done();
  });
  var fn = function () {};
  gulp.task('foo', fn);
  gulp.task('bar', fn);
  gulp.task('baz', fn);
  gulp.task('excluded', fn);
}
function removeTasks() {
  gulp.reset();
}


describe('Adding properties to package.json', function(){
  beforeEach(addTasks);
  afterEach(removeTasks);
  it('should succeed if gulp is defined', function () {
    a.doesNotThrow(function () {sync(gulp, { path: 'test/tmp/package.json' }); }, Error);
  });
  it('should add the gulp tasks to scripts', function () {
    sync(gulp, { path: 'test/tmp/package.json' });
    var f = JSON.parse(fs.readFileSync('test/tmp/package.json'));
    assert.equal(f.scripts.foo, 'gulp foo');
    assert.equal(f.scripts.bar, 'gulp bar');
    assert.equal(f.scripts.baz, 'gulp baz');
    assert.equal(f.scripts.excluded, 'gulp excluded');
  });
  it('should exclude the gulp tasks from scripts', function () {
    sync(gulp, {
      path: 'test/tmp/package.json',
      excluded: ['excluded']
    });
    var f = JSON.parse(fs.readFileSync('test/tmp/package.json'));
    assert.equal(f.scripts.foo, 'gulp foo');
    assert.equal(f.scripts.bar, 'gulp bar');
    assert.equal(f.scripts.baz, 'gulp baz');
    assert.isUndefined(f.scripts.excluded, 'excluded should be undefined');
  });
});

describe('error handling', function () {
  it('should error if gulp is undefined', function () {
    a.throws(function () {sync();}, Error, "Error thrown");
  });
  it('should error if config.excludes is not an array', function () {
    a.throws(function () {sync(gulp, {excluded: ''});}, Error, "Error thrown");
  });
});
