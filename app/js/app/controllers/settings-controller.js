"use strict";

(function () {
    angular.module('eve')
        .controller('SettingsCtrl', ['$scope', 'settingsService', 'projectsService', function ($scope, settingsService, projectsService) {

            $scope.setTheme = function (theme) {
                settingsService.setTheme(theme);
            };

            $scope.removeAllData = function () {

                // настройки
                localStorage.removeItem('settings');

                // проекты
                projectsService.getProjects().then(function (projects) {
                    projects.map(function (project) {
                        localStorage.removeItem(project.id)
                    });
                });
                localStorage.removeItem('project-list');

                location.reload();
            }
        }]);
})();
