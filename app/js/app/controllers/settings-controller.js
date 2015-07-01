(function () {
    "use strict";

    angular
        .module('eve')
        .controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ['settingsService'];

    function SettingsCtrl (settingsService) {

        var vm = this;

        vm.setTheme = function (theme) {
            settingsService.setTheme(theme);
        };

        vm.risks = settingsService.getRisks();

        vm.setRisks = function (value) {
            settingsService.setRisks(value);
        };

        vm.removeAllData = function () {
            localStorage.clear();
            window.location = '#/projects';
            location.reload();
        }
    }
})();
