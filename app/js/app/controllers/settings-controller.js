"use strict";

(function () {
    angular.module('eve')
        .controller('SettingsCtrl', ['$scope', 'settingsService', function ($scope, settingsService) {

            $scope.setTheme = function (theme) {
                settingsService.setTheme(theme);
            };
        }]);
})();
