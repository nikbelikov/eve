"use strict";

(function () {
    angular.module('eve')
        .directive('layoutView', function () {
            return {
                restrict: 'E',
                templateUrl: globalPath + '/views/drv-layout-view.html',
                controller: function ($scope, pageService) {

                    $scope.setView = function (layout) {
                        pageService.setLayoutView(layout);
                    }

                }
            }
        });
})();