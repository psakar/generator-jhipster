/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var strings = require('underscore.string');
var assert = require('assert');
var TestUtils = require('./test-utils');
var _DEBUG = false;

describe('jhipster generate entity', function () {
  var entityName = 'myEntity';
  var testUtils = new TestUtils();

  var targetDir;
  var success;
  var entityConfigFileName;
  var entityConfigFile;
  var appConfigFileFolder;
  var appConfigFileName;
  var appConfigFile;

  beforeEach(function() {
    targetDir = testUtils.createTargetFolderAndAssertIsEmpty(__filename);
    success = false;
    entityConfigFileName = strings.capitalize(entityName) + '.json';
    entityConfigFile = path.join(targetDir, '.jhipster', entityConfigFileName);
    appConfigFileFolder = targetDir;
    appConfigFileName = '.yo-rc.json';
    appConfigFile = path.join(appConfigFileFolder, appConfigFileName);
  });


  afterEach(function (done) {
    if (success && !_DEBUG) {
      testUtils.rmdirSyncRecursive(targetDir, true)
    }
    done();
  });

  var defaultFiles = [
    '.jhipster' + path.sep + entityConfigFileName,
    appConfigFileName
  ];

  var resourceDir = 'src/main/resources/';
  var testResourceDir = 'src/test/resources/';
  var webappDir = 'src/main/webapp/';
  var javaSrcDir = 'src/main/java/';
  var javaTestDir = 'src/test/java/';
  var javaPackageDir = javaSrcDir + 'com/mycompany/myapp/';

  it('creates expected files', function (done) {

    testUtils.writeEntityConfig(entityConfigFile, entityConfigContent());
    testUtils.writeAppConfig(appConfigFile, appConfigContent());

    process.chdir(targetDir);
    helpers.run(path.join(__dirname, '../entity'), {
    'tmpdir': false
    })
    .withOptions({
      skipInstall: true,
      appPath: path.join(targetDir, 'src/main/webapp')
    })
    .withPrompts({})
    .withArguments(entityName)
    .on('end', function () {
      var expectedFilesDir = testUtils.createArchetypesDir('entity');
      testUtils.assertGeneratedFiles(expectedFilesDir, targetDir);
      success = true;
      done();
    });
  });

  function entityConfigContent() {
    return '{'
    + '\n' + '   "version": "' + testUtils.getGeneratorVersion() + '",'
    + '\n' + '   "generatedDatetime": "' + testUtils.getGeneratedDateTime() + '",'
    + '\n' + '   "tableName": "T_MYENTITY",'
    + '\n' + '   "relationships": [],'
    + '\n' + '  "fields": ['
    + '\n' + '    {'
    + '\n' + '    "fieldId": 1,'
    + '\n' + '    "fieldName": "field1",'
    + '\n' + '    "fieldType": "String",'
    + '\n' + '    "fieldNameCapitalized": "Field1",'
    + '\n' + '    "fieldNameUnderscored": "field1",'
    + '\n' + '    "fieldInJavaBeanMethod": "StringField",'
    + '\n' + '    "fieldValidate": true,'
    + '\n' + '    "fieldValidateRules": ['
    + '\n' + '      "required",'
    + '\n' + '      "minlength",'
    + '\n' + '      "maxlength"'
    + '\n' + '    ],'
    + '\n' + '    "fieldValidateRulesMinlength": "3",'
    + '\n' + '    "fieldValidateRulesMaxlength": "50"'
    + '\n' + '    }'
    + '\n' + '  ],'
    + '\n' + '  "fieldsContainOwnerManyToMany": false,'
    + '\n' + '  "fieldsContainOneToMany": false,'
    + '\n' + '  "fieldsContainLocalDate": false,'
    + '\n' + '  "fieldsContainCustomTime": false,'
    + '\n' + '  "fieldsContainBigDecimal": false,'
    + '\n' + '  "fieldsContainDateTime": false,'
    + '\n' + '  "fieldsContainDate": false,'
    + '\n' + '  "changelogDate": "20150405192020",'
    + '\n' + '  "pagination": "pagination",'
    + '\n' + '  "validation": true'
    + '\n' + '}'
    + '\n';
  }

  function appConfigContent() {
    return '{'
    + '\n' + '  "generator-jhipster": {'
    + '\n' + '  "appPath": "' + path.join(targetDir, 'src/main/webapp') + '",'
    + '\n' + '  "version": "' + testUtils.getGeneratorVersion() + '",'
    + '\n' + '  "generatedDatetime": "' + testUtils.getGeneratedDateTime() + '",'
    + '\n' + '  "baseName": "jhipster",'
    + '\n' + '  "packageName": "com.mycompany.myapp",'
    + '\n' + '  "packageFolder": "com/mycompany/myapp",'
    + '\n' + '  "authenticationType": "session",'
    + '\n' + '  "hibernateCache": "ehcache",'
    + '\n' + '  "clusteredHttpSession": "no",'
    + '\n' + '  "websocket": "no",'
    + '\n' + '  "databaseType": "sql",'
    + '\n' + '  "devDatabaseType": "h2Memory",'
    + '\n' + '  "prodDatabaseType": "postgresql",'
    + '\n' + '  "useCompass": false,'
    + '\n' + '  "buildTool": "maven",'
    + '\n' + '  "frontendBuilder": "grunt",'
    + '\n' + '  "javaVersion": "8",'
    + '\n' + '  "enableTranslation": "true",'
    + '\n' + '  "rememberMeKey": "edd44237637a11657087ce937cca7e3925161366",'
    + '\n' + '  "searchEngine": "no"'
    + '\n' + '  }'
    + '\n' + '}';
  }

});

