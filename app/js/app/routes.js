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
                controller: 'ProjectsCtrl',
                controllerAs: 'projectsCtrl'
            })
            .when('/projects/:id', {
                templateUrl: globalPath + '/views/project.html',
                controller: 'MainCtrl',
                controllerAs: 'mainCtrl'
            })
            .when('/settings', {
                templateUrl: globalPath + '/views/settings.html',
                controller: 'SettingsCtrl',
                controllerAs: 'settingsCtrl'
            })
            .otherwise({redirectTo: '/projects'});
    }
})();
