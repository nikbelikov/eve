"use strict";

angular.module('eve')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {redirectTo: '/projects'})
            .when('/design', {
                templateUrl: globalPath + '/views/design.html',
                controller: 'MainCtrl'
            })
            .when('/html', {
                templateUrl: globalPath + '/views/html.html',
                controller: 'MainCtrl'
            })
            .when('/frontend', {
                templateUrl: globalPath + '/views/frontend.html',
                controller: 'MainCtrl'
            })
            .when('/backend', {
                templateUrl: globalPath + '/views/backend.html',
                controller: 'MainCtrl'
            })
            .when('/projects', {
                templateUrl: globalPath + '/views/projects.html',
                controller: 'MainCtrl'
            })
            .otherwise({redirectTo: '/projects'});

    }]);
