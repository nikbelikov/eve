angular.module('eve')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
        .when('/', { redirectTo: '/design' })
        .when('/design', {
            templateUrl: '/views/design.html',
            controller: 'PageCtrl'
        })
        .when('/html', {
            templateUrl: '/views/html.html',
            controller: 'PageCtrl'
        })
        .when('/frontend', {
            templateUrl: '/views/frontend.html',
            controller: 'PageCtrl'
        })
        .when('/backend', {
            templateUrl: '/views/backend.html',
            controller: 'PageCtrl'
        })
        .otherwise({ redirectTo: '/design' });

    }]);
