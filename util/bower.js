'use strict';

var fs = require('fs');
var bower = module.exports;


bower.readJson = function readJson(grunt) {
  var bowerrc = {};
  var componentsFilename;

  // Read bowerrc first, if present
  if (fs.existsSync('.bowerrc')) {
    bowerrc = grunt.file.readJSON('.bowerrc');
  }

  // If bowerrc defines a 'json' attribute, use that
  componentsFilename = bowerrc.json || 'bower.json';
  return grunt.file.readJSON(componentsFilename);
};
