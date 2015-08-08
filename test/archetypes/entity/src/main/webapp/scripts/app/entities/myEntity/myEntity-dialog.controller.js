'use strict';

angular.module('jhipsterApp').controller('MyEntityDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'MyEntity',
        function($scope, $stateParams, $modalInstance, entity, MyEntity) {

        $scope.myEntity = entity;
        $scope.load = function(id) {
            MyEntity.get({id : id}, function(result) {
                $scope.myEntity = result;
            });
        };

        var onSaveFinished = function (result) {
            $scope.$emit('jhipsterApp:myEntityUpdate', result);
            $modalInstance.close(result);
        };

        $scope.save = function () {
            if ($scope.myEntity.id != null) {
                MyEntity.update($scope.myEntity, onSaveFinished);
            } else {
                MyEntity.save($scope.myEntity, onSaveFinished);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
