"use strict";

(function () {
    angular.module('eve')
        .controller('SettingsCtrl', ['$scope', 'settingsService', 'projectsService', function ($scope, settingsService, projectsService) {

            $scope.setTheme = function (theme) {
                settingsService.setTheme(theme);
            };

            $scope.risks = settingsService.getRisks();

            $scope.setRisks = function (value) {
                settingsService.setRisks(value);
            };

            $scope.removeAllData = function () {
                localStorage.clear();
                window.location = '#/projects';
                location.reload();
            }
        }]);
})();
