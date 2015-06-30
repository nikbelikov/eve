(function () {
    "use strict";

    angular
        .module('eve')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config ($routeProvider) {
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
            .when('/settings', {
                templateUrl: globalPath + '/views/settings.html',
                controller: 'SettingsCtrl'
            })
            .otherwise({redirectTo: '/projects'});
    }
})();
