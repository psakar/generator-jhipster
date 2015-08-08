/*global describe, beforeEach, it*/
'use strict';

var path     = require('path');
var fsExtra = require('fs.extra');
var helpers  = require('yeoman-generator').test;
var TestUtils = require('./test-utils');
var _DEBUG = false;

describe('jhipster generate app hibernate ehcache', function () {

  var testUtils = new TestUtils();
  var targetDir;
  var success;
  beforeEach(function() {
    targetDir = testUtils.createTargetFolderAndAssertIsEmpty(__filename);
    success = false;
  });

  afterEach(function (done) {
    if (success && !_DEBUG) {
      testUtils.rmdirSyncRecursive(targetDir, true)
    }
    done();
  });

  var resourceDir = 'src/main/resources/';
  var testResourceDir = 'src/test/resources/';
  var webappDir = 'src/main/webapp/';
  var javaSrcDir = 'src/main/java/';
  var javaTestDir = 'src/test/java/';
  var javaPackageDir = javaSrcDir + 'com/mycompany/myapp/';


  it('generates files for option hibernateCache "ehcache"', function (done) {
      process.chdir(targetDir);
      helpers.run(path.join(__dirname, '../app'), {
          'tmpdir': false
      })
      .withOptions({skipInstall: true})
      .withPrompts({
          'baseName': 'jhipster',
          'packageName': 'com.mycompany.myapp',
          'packageFolder': "com/mycompany/myapp",
          'javaVersion': '7',
          'authenticationType': 'token',
          'databaseType': 'sql',
          'hibernateCache': 'ehcache',
          'clusteredHttpSession': 'no',
          'websocket': 'no',
          'prodDatabaseType': 'mysql',
          'devDatabaseType': 'h2Memory',
          'frontendBuilder': 'grunt',
          'useCompass': false,
          'enableTranslation': true,
          'buildTool': "maven",
          'rememberMeKey': "edd44237637a11657087ce937cca7e3925161366",
          'searchEngine': "no"
      })
      .on('end', function () {
          testUtils.fixDateInGeneratedGruntfileJs(targetDir);
          testUtils.fixGeneratedDatetime(targetDir);
          fixRememberMeKeyInGeneratedFiles(targetDir);
          var expectedFilesDir = testUtils.createArchetypesDir('app-hibernate-ehcache');
          testUtils.assertGeneratedFiles(expectedFilesDir, targetDir);
          success = true;
          done();
      });
  });


  var rememberKeyLineStart = testUtils.rememberKeyLineStart;
  var rememberKeyPregenerated = 'edd44237637a11657087ce937cca7e3925161366';
  var rememberKeyLineStartApplicationYml = 'jhipster.security.rememberme.key: ';

  function fixRememberMeKeyInGeneratedFiles(dir) {
    var file = path.resolve(dir, ".yo-rc.json");
    var rememberMeKey = testUtils.findGeneratedRememberMeKey(file);

    testUtils.replaceInGeneratedFile(file, rememberKeyLineStart + '"' + rememberMeKey + '"', rememberKeyLineStart + '"' + rememberKeyPregenerated + '"');

    file = path.resolve(dir, "src" + path.sep + "main" + path.sep + "resources" + path.sep + "config" + path.sep + "application.yml");
    testUtils.replaceInGeneratedFile(file, rememberKeyLineStartApplicationYml + rememberMeKey, rememberKeyLineStartApplicationYml + rememberKeyPregenerated);
    file = path.resolve(dir, "src" + path.sep + "test" + path.sep + "resources" + path.sep + "config" + path.sep + "application.yml");
    testUtils.replaceInGeneratedFile(file, rememberKeyLineStartApplicationYml + rememberMeKey, rememberKeyLineStartApplicationYml + rememberKeyPregenerated);

  }

});

