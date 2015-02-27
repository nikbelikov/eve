angular.module('eve')
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {redirectTo: '/design'})
            .when('/design', {
                templateUrl: '/views/design.html',
                controller: 'MainCtrl'
            })
            .when('/html', {
                templateUrl: '/views/html.html',
                controller: 'MainCtrl'
            })
            .when('/frontend', {
                templateUrl: '/views/frontend.html',
                controller: 'MainCtrl'
            })
            .when('/backend', {
                templateUrl: '/views/backend.html',
                controller: 'MainCtrl'
            })
            .otherwise({redirectTo: '/design'});

    }]);
