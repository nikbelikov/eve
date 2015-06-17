"use strict";

(function () {
    angular.module('eve')
        .directive('mainMenu', ['$location', function ($location) {
            return {
                restrict: 'E',
                templateUrl: globalPath + '/views/drv-main-menu.html',
                controller: function ($scope, $http) {

                    $http.get(globalPath + '/json/menu.json').success(function (data) {
                        $scope.menuItems = data;
                    });

                    $scope.currentMenuItem = $location.path().split('/')[1];

                    $scope.isCurrentMenu = function (item) {
                        return $scope.currentMenuItem == item.pageUrl;
                    };

                    $scope.setCurrentMenu = function (item) {
                        $scope.currentMenuItem = item.pageUrl;
                    };

                }
            }
        }]);
})();
