'use strict';
var replacements = exports.replacements = {};
var versions = exports.versions = {};


// AngularJS

var angularFiles = [
  'angular',
  'angular-cookies',
  'angular-loader',
  'angular-resource',
  'angular-sanitize'
];
var angularVersions = ['1.0.6','1.0.5', '1.0.4', '1.0.3', '1.0.2', '1.0.1', '1.1.4', '1.1.3'];

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


// jQuery

// Build up a map of versions supported by Google's CDN
// scraped from: https://developers.google.com/speed/libraries/devguide
versions.jquery = ['2.0.0', '1.9.1', '1.9.0', '1.8.3', '1.8.2', '1.8.1', '1.8.0', '1.7.2', '1.7.1', '1.7.0', '1.6.4', '1.6.3', '1.6.2', '1.6.1', '1.6.0', '1.5.2', '1.5.1', '1.5.0', '1.4.4', '1.4.3', '1.4.2', '1.4.1', '1.4.0', '1.3.2', '1.3.1', '1.3.0', '1.2.6', '1.2.3'];
replacements.jquery = {
  from: 'components/jquery/jquery.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/jquery/' + version + '/jquery.min.js';
  }
};

versions['chrome-frame'] = ['1.0.3', '1.0.2', '1.0.1', '1.0.0'];
replacements['chrome-frame'] = {
  from: 'components/chrome-frame/chrome-frame.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/chrome-frame/' + version + '/CFinstall.min.js';
  }
};

versions.dojo = ['1.8.4', '1.8.3', '1.8.2', '1.8.1', '1.8.0', '1.7.4', '1.7.3', '1.7.2', '1.7.1', '1.7.0', '1.6.1', '1.6.0', '1.5.2', '1.5.1', '1.5.0', '1.4.4', '1.4.3', '1.4.1', '1.4.0', '1.3.2', '1.3.1', '1.3.0', '1.2.3', '1.2.0', '1.1.1'];
replacements.dojo = {
  from: 'components/dojo/dojo.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/dojo/' + version + '/dojo.js';
  }
};

versions['ext-core'] = ['3.1.0', '3.0.0'];
replacements['ext-core'] = {
  from: 'components/ext-core/ext-core.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/ext-core/' + version + '/ext-core.js';
  }
};

versions['jquery-ui'] = ['1.10.3', '1.10.2', '1.10.1', '1.10.0', '1.9.2', '1.9.1', '1.9.0', '1.8.24', '1.8.23', '1.8.22', '1.8.21', '1.8.20', '1.8.19', '1.8.18', '1.8.17', '1.8.16', '1.8.15', '1.8.14', '1.8.13', '1.8.12', '1.8.11', '1.8.10', '1.8.9', '1.8.8', '1.8.7', '1.8.6', '1.8.5', '1.8.4', '1.8.2', '1.8.1', '1.8.0', '1.7.3', '1.7.2', '1.7.1', '1.7.0', '1.6.0', '1.5.3', '1.5.2'];
replacements['jquery-ui'] = {
  from: 'components/jquery-ui/jquery-ui.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/jquery-ui/' + version + '/jquery-ui.min.js';
  }
};

versions.mootools = ['1.4.5','1.4.4','1.4.3','1.4.2','1.4.1','1.4.0','1.3.2','1.3.1','1.3.0','1.2.5','1.2.4','1.2.3','1.2.2','1.2.1','1.1.2','1.1.1'];
replacements.mootools = {
  from: 'components/mootools/mootools.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/mootools/' + version + '/mootools-yui-compressed.js';
  }
};

versions.prototype = ['1.7.1.0', '1.7.0.0', '1.6.1.0', '1.6.0.3', '1.6.0.2'];
replacements.prototype = {
  from: 'components/prototype/prototype.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/prototype/' + version + '/prototype.js';
  }
};

versions.scriptaculous = ['1.9.0', '1.8.3', '1.8.2', '1.8.1'];
replacements.scriptaculous = {
  from: 'components/scriptaculous/scriptaculous.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/scriptaculous/' + version + '/scriptaculous.js';
  }
};

versions.swfobject = ['2.2', '2.1'];
replacements.swfobject = {
  from: 'components/swfobject/swfobject.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/swfobject/' + version + '/swfobject.js';
  }
};

versions.webfont = ['1.4.2', '1.3.0', '1.1.2', '1.1.1', '1.1.0', '1.0.31', '1.0.30', '1.0.29', '1.0.28', '1.0.27', '1.0.26', '1.0.25', '1.0.24', '1.0.23', '1.0.22', '1.0.21', '1.0.19', '1.0.18', '1.0.17', '1.0.16', '1.0.15', '1.0.14', '1.0.13', '1.0.12', '1.0.11', '1.0.10', '1.0.9', '1.0.6', '1.0.5', '1.0.4', '1.0.3', '1.0.2', '1.0.1', '1.0.0'];
replacements.webfont = {
  from: 'components/webfont/webfont.js',
  to: function (version) {
    return '//ajax.googleapis.com/ajax/libs/webfont/' + version + '/webfont.js';
  }
};
