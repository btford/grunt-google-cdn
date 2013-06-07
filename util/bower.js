'use strict';

var bowerConfig = require('bower').config;
var bowerUtil = module.exports;


bowerUtil.readJson = function readJson(grunt) {
  return grunt.file.readJSON(bowerConfig.json);
};

bowerUtil.joinComponent = function joinComponent(component) {
  // Strip the leading path segment from the configured bower components
  // directory. E.g. app/bower_components -> bower_components'
  // This assumes the directory is specified with a forward slash directory
  // separator character.
  var dirBits = bowerConfig.directory.split('/');
  dirBits.shift();

  // Always join the path with a forward slash, because it's used to replace the
  // path in HTML.
  return [dirBits.join('/'), component].join('/');
};
