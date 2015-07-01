(function () {
    "use strict";

    angular
        .module('eve')
        .controller('GlobalCtrl', GlobalCtrl);

    GlobalCtrl.$inject = ['settingsService'];

    function GlobalCtrl (settingsService) {
        this.settings = settingsService.getSettings();
    }
})();
