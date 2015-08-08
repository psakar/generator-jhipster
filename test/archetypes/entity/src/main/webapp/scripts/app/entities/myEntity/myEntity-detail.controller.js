'use strict';

angular.module('jhipsterApp')
    .controller('MyEntityDetailController', function ($scope, $rootScope, $stateParams, entity, MyEntity) {
        $scope.myEntity = entity;
        $scope.load = function (id) {
            MyEntity.get({id: id}, function(result) {
                $scope.myEntity = result;
            });
        };
        $rootScope.$on('jhipsterApp:myEntityUpdate', function(event, result) {
            $scope.myEntity = result;
        });
    });
