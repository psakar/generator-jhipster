'use strict';

angular.module('jhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('myEntity', {
                parent: 'entity',
                url: '/myEntitys',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'jhipsterApp.myEntity.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/myEntity/myEntitys.html',
                        controller: 'MyEntityController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('myEntity');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('myEntity.detail', {
                parent: 'entity',
                url: '/myEntity/{id}',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'jhipsterApp.myEntity.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/myEntity/myEntity-detail.html',
                        controller: 'MyEntityDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('myEntity');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'MyEntity', function($stateParams, MyEntity) {
                        return MyEntity.get({id : $stateParams.id});
                    }]
                }
            })
            .state('myEntity.new', {
                parent: 'myEntity',
                url: '/new',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/myEntity/myEntity-dialog.html',
                        controller: 'MyEntityDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {field1: null, id: null};
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('myEntity', null, { reload: true });
                    }, function() {
                        $state.go('myEntity');
                    })
                }]
            })
            .state('myEntity.edit', {
                parent: 'myEntity',
                url: '/{id}/edit',
                data: {
                    roles: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/myEntity/myEntity-dialog.html',
                        controller: 'MyEntityDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['MyEntity', function(MyEntity) {
                                return MyEntity.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('myEntity', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
