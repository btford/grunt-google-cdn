'use strict';

var proxyquire = require('proxyquire');

exports.bower = {

  setUp: function (cb) {
    this.bowerConfig = {};

    this.bowerMock = {
      config: this.bowerConfig
    };

    this.bowerUtil = proxyquire('../util/bower', {
      bower: this.bowerMock
    });

    cb();
  },

  joinComponent: function (test) {
    this.bowerConfig.directory = 'app/bower_components';

    var result = this.bowerUtil.joinComponent('jquery/jquery-2.0.js');
    test.equal(result, 'bower_components/jquery/jquery-2.0.js');

    test.done();
  }
};
