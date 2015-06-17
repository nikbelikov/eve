"use strict";

angular.module('eve')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {redirectTo: '/design'})
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
            .otherwise({redirectTo: '/design'});

    }]);
