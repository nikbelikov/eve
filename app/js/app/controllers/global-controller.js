(function () {
    "use strict";

    angular
        .module('eve')
        .controller('GlobalCtrl', GlobalCtrl);

    GlobalCtrl.$inject = ['$scope', 'settingsService'];

    function GlobalCtrl ($scope, settingsService) {
        $scope.settings = settingsService.getSettings();
    }
})();
