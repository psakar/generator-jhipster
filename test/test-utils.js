'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var dircompare = require('dir-compare');
var packagejs = require(__dirname + '/../package.json');

var _DEBUG = false;

var TestUtils = module.exports = function TestUtils() {
  this.rememberKeyLineStart = '    "rememberMeKey": ';
  this.version = packagejs.version;
};

TestUtils.prototype.assertGeneratedFiles = function (expectedFilesDir, targetDir) {
  if (_DEBUG) console.log('Find diff');
  var options = {
    compareSize: true,
    compareContent: true
  };
  var res = dircompare.compareSync(expectedFilesDir, targetDir, options);
  if (_DEBUG || (res.distinct != 0)) {
    console.log('equal: ' + res.equal);
    console.log('distinct: ' + res.distinct);
    console.log('left: ' + res.left);
    console.log('right: ' + res.right);
    console.log('differences: ' + res.differences);
    console.log('same: ' + res.same);
    res.diffSet.forEach(function (entry) {
      var state = {
          'equal' : '==',
          'left' : '->',
          'right' : '<-',
          'distinct' : '<>'
      }[entry.state];
      if (entry.state != 'equal') {
        var name1 = targetDir + (entry.name1 ? entry.relativePath + path.sep + entry.name1 : '');
        var name2 = expectedFilesDir + (entry.name2 ? entry.relativePath + path.sep + entry.name2 : '');
        console.log(" " + entry.type1 + " " +  name1 + " " + state + " " + entry.type2 + " " + name2);
      }
    });
  }
  assert.equal(0, res.distinct, 'Generated files differ from template')
};

TestUtils.prototype.replaceInGeneratedFile = function (file, toReplace, replacement) {
  if (_DEBUG) console.log('Fix file ' + file);
  var content = fs.readFileSync(file);
  content = ('' + content).replace(toReplace, replacement);
  fs.writeFileSync(file, content);
}

TestUtils.prototype.findGeneratedRememberMeKey = function (file, lineStart) {
  if (_DEBUG) {
    console.log('Fix findGeneratedRememberMeKey in ' + file);
  }
  var line = this.findLineStartingWith(file, this.rememberKeyLineStart, true);
  var rememberMeKey = line.substring(this.rememberKeyLineStart.length);
  rememberMeKey = rememberMeKey.substring(1, rememberMeKey.length - 1);
  if (_DEBUG) {
    console.log('RemeberMeKey ' + rememberMeKey);  
  }
  return rememberMeKey;
}

TestUtils.prototype.findLineStartingWith = function (file, lineStart, mandatory) {
  if (_DEBUG) console.log('Find in ' + file + ' line starting with ' + lineStart);
  var array = fs.readFileSync(file).toString().split("\n");
  var len = lineStart.length;
  for (var i in array) {
    var line = array[i];
    if (lineStart == line.substring(0, len)) {
      if (_DEBUG) 
		  console.log('Found line :' + line);
      return line;
    }
  }
  if (mandatory) {
    throw Error('Line starting with ' + lineStart + ' was not found in ' + file);
  }
  return null;
}

TestUtils.prototype.fixDateInGeneratedGruntfileJs = function (targetDir) {
  this.replaceInGeneratedFile(path.resolve(targetDir, "Gruntfile.js"), '// Generated on ' + (new Date).toISOString().split('T')[0], '// Generated on 2015-01-01'); 
}

TestUtils.prototype.createTargetPath = function (filename) {
  return path.join(path.dirname(filename), 'temp', path.basename(filename, '.js'));
}

TestUtils.prototype.createArchetypesDir = function (name) {
  return path.join(__dirname, 'archetypes', name);
}

TestUtils.prototype.getGeneratorVersion = function () {
  return this.version;
}

TestUtils.prototype.getGeneratedDateTime = function () {
  return "2015-03-31 14:59:00.123Z";
}

TestUtils.prototype.fixGeneratedDatetime = function (targetDir) {
  var file = path.resolve(targetDir, ".yo-rc.json");
  if (_DEBUG) {
    console.log('Fix generatedDatetime in ' + file);
  }
  var testGeneratedDateTime = this.getGeneratedDateTime();
  var lineStart = '    "generatedDatetime": "';
  var line = this.findLineStartingWith(path.resolve(targetDir, '.yo-rc.json'), lineStart, true);
  var generatedDatetime = line.substring(lineStart.length, lineStart.length + testGeneratedDateTime.length);
  if (_DEBUG) {
    console.log('generatedDatetime ' + generatedDatetime);  
  }
  this.replaceInGeneratedFile(file, lineStart + generatedDatetime + '"', lineStart + testGeneratedDateTime + '"'); 
}
