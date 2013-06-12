'use strict';

exports.cdnify = {
  loads: function (test) {
    var cdnify = require('./tasks/cdnify');
    test.ok(cdnify !== undefined);

    test.done();
  }
};

