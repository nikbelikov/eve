"use strict";

(function () {
    angular.module('eve')
        .controller('GlobalCtrl', ['$scope', 'settingsService', function ($scope, settingsService) {

            $scope.settings = settingsService.getSettings();

        }]);
})();
