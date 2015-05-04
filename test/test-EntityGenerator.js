/*global describe, beforeEach, it*/
'use strict';

var assert  = require('assert');
var helpers = require('yeoman-generator').test;
var _DEBUG = false;

describe('jhipster EntityGenerator', function () {

  afterEach(function (done) {
      done();
  });


  it('escapes special characters in sql names', function (done) {
      var entityGenerator = helpers.createGenerator('jhipster:entity', [
          './entity'
      ], 'entityName');
      assert.equal('name', entityGenerator.escapeQuotes('name'));
      assert.equal('\\"name\\"', entityGenerator.escapeQuotes('"name"'));
      done();
  });

  it('removes surrounding quotes in sql names', function (done) {
    var entityGenerator = helpers.createGenerator('jhipster:entity', [
      './entity'
    ], 'entityName');
    assert.equal('name', entityGenerator.removeSurroundingQuotes('name'));
    assert.equal('name', entityGenerator.removeSurroundingQuotes('"name"'));
    done();
  });

});

