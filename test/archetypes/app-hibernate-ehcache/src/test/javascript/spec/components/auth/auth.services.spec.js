'use strict';

describe('Services Tests ', function () {

    beforeEach(module('jhipsterApp'));

    describe('Auth', function () {
        var $httpBackend, spiedLocalStorageService, authService, spiedAuthServerProvider;

        beforeEach(inject(function($injector, localStorageService, Auth, AuthServerProvider) {
            $httpBackend = $injector.get('$httpBackend');
            spiedLocalStorageService = localStorageService;
            authService = Auth;
            spiedAuthServerProvider = AuthServerProvider;
            //Request on app init
            $httpBackend.whenGET('scripts/app/main/main.html').respond({});
            $httpBackend.whenGET('scripts/components/navbar/navbar.html').respond({});
            var globalJson = new RegExp('i18n\/.*\/global.json')
            var mainJson = new RegExp('i18n\/.*\/main.json');
            $httpBackend.whenGET(globalJson).respond({});
            $httpBackend.whenGET(mainJson).respond({});
          }));
        //make sure no expectations were missed in your tests.
        //(e.g. expectGET or expectPOST)
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        

    });
});
