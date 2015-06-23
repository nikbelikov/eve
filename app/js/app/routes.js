"use strict";

angular.module('eve')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {redirectTo: '/projects'})
            .when('/projects', {
                templateUrl: globalPath + '/views/projects-list.html',
                controller: 'ProjectsCtrl'
            })
            .when('/projects/:id', {
                templateUrl: globalPath + '/views/project.html',
                controller: 'MainCtrl'
            })
            .otherwise({redirectTo: '/projects'});

    }]);
