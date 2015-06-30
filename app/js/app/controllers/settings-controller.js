(function () {
    "use strict";

    angular
        .module('eve')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['$scope', 'settingsService'];

    function SettingsCtrl ($scope, settingsService) {

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
    }
})();
