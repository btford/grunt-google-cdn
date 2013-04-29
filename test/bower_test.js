'use strict';

var proxyquire = require('proxyquire');
var sinon = require('sinon');

exports.bower = {

  setUp: function (cb) {

    this.gruntMock = {
      file: {
        readJSON: sinon.stub()
      }
    };
    this.gruntMock.file.readJSON.returns({key: 'value'});

    this.fsMock = {
      existsSync: sinon.stub()
    };

    this.bower = proxyquire('../util/bower', {
      fs: this.fsMock
    });

    cb();
  },

  tearDown: function (cb) {
    this.fsMock.existsSync.reset();
    this.gruntMock.file.readJSON.reset();

    cb();
  },

  readJsonWithoutBowerrc: function (test) {
    this.fsMock.existsSync.returns(false);

    // Yay, depdendency injection!
    var result = this.bower.readJson(this.gruntMock);
    test.equals(result.key, 'value');

    test.ok(this.fsMock.existsSync.calledWith('.bowerrc'));
    // Fall back to bower.json
    test.ok(this.gruntMock.file.readJSON.calledWith('bower.json'));

    test.done();
  },

  readJsonWithBowerrc: function (test) {
    this.fsMock.existsSync.returns(true);
    this.gruntMock.file.readJSON.withArgs('.bowerrc').returns({json: 'myconf.json'});

    this.bower.readJson(this.gruntMock);

    // Use the provided config file.
    test.ok(this.gruntMock.file.readJSON.calledWith('myconf.json'));
    test.done();
  }
};
