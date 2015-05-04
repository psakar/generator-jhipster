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

  it('removes defaults string value', function (done) {
    var entityGenerator = helpers.createGenerator('jhipster:entity', [
       './entity'
    ], 'entityName');
    assert.equal('name', entityGenerator.defaultString('name', null));
    assert.equal('name', entityGenerator.defaultString('name', undefined));
    assert.equal('name', entityGenerator.defaultString(null, 'name'));
    assert.equal('name', entityGenerator.defaultString(undefined, 'name'));
    done();
  });

  it('uncapitalizes first letter', function (done) {
    var entityGenerator = helpers.createGenerator('jhipster:entity', [
       './entity'
    ], 'entityName');
    assert.equal(null, entityGenerator.uncapitalize(null));
    assert.equal(undefined, entityGenerator.uncapitalize(undefined));
    assert.equal('name', entityGenerator.uncapitalize('name'));
    assert.equal('name', entityGenerator.uncapitalize('Name'));
    done();
  });
});

