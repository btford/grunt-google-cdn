'use strict';

var semver = require('semver');
var hoist = require('../util/hoist.js');

module.exports = function (grunt) {

  grunt.registerMultiTask('cdnify', 'replace scripts with refs to the Google CDN', function () {
    var options = this.options();
    // collect files
    var files = grunt.file.expand({ filter: 'isFile' }, this.data.html);
    var dest = options.dest;

    var compJson = grunt.file.readJSON('component.json');

    grunt.log
      .writeln('Going through ' + grunt.log.wordlist(files) + ' to update script refs');

    files = files.map(function (filepath) {
      return {
        path: filepath,
        body: grunt.file.read(filepath)
      };
    });

    // map refs from bower -> cdn
    var replacements = {};

    // TODO: jQuery, Dojo, etc.

    var angularFiles = [
      'angular',
      'angular-cookies',
      'angular-loader',
      'angular-resource',
      'angular-sanitize'
    ];

    // Build up a map of versions supported by Google's CDN
    // scraped from: https://developers.google.com/speed/libraries/devguide
    var versions = {
      'jQuery': ['1.9.1', '1.9.0', '1.8.3', '1.8.2', '1.8.1', '1.8.0', '1.7.2', '1.7.1', '1.7.0', '1.6.4', '1.6.3', '1.6.2', '1.6.1', '1.6.0', '1.5.2', '1.5.1', '1.5.0', '1.4.4', '1.4.3', '1.4.2', '1.4.1', '1.4.0', '1.3.2', '1.3.1', '1.3.0', '1.2.6', '1.2.3']
    };
    var angularVersions = ['1.0.4', '1.0.3', '1.0.2', '1.0.1'];
    angularFiles.forEach(function (file) {
      versions[file] = angularVersions;
    });

    angularFiles.forEach(function (item) {
      replacements[item] = {
        from: 'components/' + item + '/' + item + '.js',
        to: function (version) {
          return '//ajax.googleapis.com/ajax/libs/angularjs/' + version + '/' + item + '.min.js';
        }
      };
    });
    replacements['jquery'] = {
      from: 'components/jquery/jquery.js',
      to: function (version) {
        return '//ajax.googleapis.com/ajax/libs/jquery/' + version + '/jquery.min.js';
      }
    };

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
