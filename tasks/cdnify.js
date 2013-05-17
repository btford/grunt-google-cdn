'use strict';

var semver = require('semver');
var hoist = require('../util/hoist');
var bower = require('../util/bower');


// map refs from bower -> cdn
var replacements = require('../lib/data.js').replacements;

// map of lib name -> Google CDN supported versions
var versions = require('../lib/data.js').versions;

module.exports = function (grunt) {

  grunt.registerMultiTask('cdnify', 'replace scripts with refs to the Google CDN', function () {
    // collect files
    var files = grunt.file.expand({ filter: 'isFile' }, this.data.html);
    var compJson = bower.readJson(grunt);

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
        var from;
        if (!versionStr) {
          return;
        }
        var version = semver.maxSatisfying(versions[name], versionStr);
        if (version) {
          from = bower.joinComponent(rep.from);
          content = content.replace(from, rep.to(version));
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
