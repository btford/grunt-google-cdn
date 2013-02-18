// i am not good at naming things
'use strict';

module.exports = function (grunt) {

  grunt.registerMultiTask('cdnify', 'replace scripts with refs to the Google CDN', function () {
    var options = this.options();
    // collect files
    var files = grunt.file.expand({ filter: 'isFile' }, this.data.html);
    var dest = options.dest;

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
      'angular-resource',
      'angular-cookies',
      'angular-sanitize'
    ];

    // TODO: versions
    angularFiles.forEach(function (item) {
      replacements['components/' + item + '/' + item + '.js' ] =
        '//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/' + item + '.min.js';
    });

    files.forEach(function (file) {
      var content = file.body;
      grunt.util._.each(replacements, function (cdnRef, bowerRef) {
        content = content.replace(bowerRef, cdnRef);
      });

      grunt.file.write(file.path, content);
    });
  });
};
