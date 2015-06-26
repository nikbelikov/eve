"use strict";

(function () {
    angular.module('eve')
        .service('settingsService', ['$q', function ($q) {

            this.settings = {
                theme: "light",
                risks: 10
            };

            this.getSettings = function () {
                var settings = JSON.parse(localStorage.getItem('settings'));

                if (!settings) {
                    return this.settings;
                } else {
                    return settings;
                }
            };

            this.setTheme = function (theme) {
                this.settings.theme = theme;
                localStorage.setItem('settings', JSON.stringify(this.settings));
                location.reload();
            };

            this.getRisks = function () {
                return this.getSettings().risks;
            };

            this.setRisks = function (value) {
                this.settings.risks = value;
                localStorage.setItem('settings', JSON.stringify(this.settings));
            };

        }]);

})();
