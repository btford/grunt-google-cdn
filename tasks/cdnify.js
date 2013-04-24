'use strict';

var semver = require('semver');
var fs = require('fs');
var hoist = require('../util/hoist.js');


// map refs from bower -> cdn
var replacements = require('../lib/data.js').replacements;

// map of lib name -> Google CDN supported versions
var versions = require('../lib/data.js').versions;

module.exports = function (grunt) {

  function readBowerJson() {
    var bowerrc = {};
    var componentsFilename;

    // Read bowerrc first, if present
    if (fs.existsSync('.bowerrc')) {
      bowerrc = grunt.file.readJSON('.bowerrc');
    }

    // If bowerrc defines a 'json' attribute, use that
    componentsFilename = bowerrc.json || 'component.json';
    return grunt.file.readJSON(componentsFilename);
  }

  grunt.registerMultiTask('cdnify', 'replace scripts with refs to the Google CDN', function () {
    var options = this.options();
    // collect files
    var files = grunt.file.expand({ filter: 'isFile' }, this.data.html);
    var dest = options.dest;
    var compJson = readBowerJson();

    grunt.log
      .writeln('Going through ' + grunt.log.wordlist(files) + ' to update script refs');

    files = files.map(function (filepath) {
      return {
        path: filepath,
        body: grunt.file.read(filepath)
      };
    });

    files.forEach(function (file) {
      var content = file.body;

      grunt.util._.each(replacements, function (rep, name) {
        var versionStr = compJson.dependencies[name] || compJson.devDependencies[name];
        if (!versionStr) {
          return;
        }
        var version = semver.maxSatisfying(versions[name], versionStr);
        if (version) {
          content = content.replace(rep.from, rep.to(version));
        }
      });

      var linesToMove = [];
      content.split('\n').forEach(function (line) {
        if (line.indexOf('//ajax.googleapis.com/ajax/libs/') !== -1) {
          linesToMove.push(line);
        }
      });

      try {
        content = hoist({
          body: content,
          marker: '<!-- build:js scripts/scripts.js -->',
          move: linesToMove
        });
        console.log('Hoisted CDN <script> tags in ' + file.path);
      } catch (e) {}

      grunt.file.write(file.path, content);
    });

  });
};
