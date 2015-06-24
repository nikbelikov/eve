"use strict";

(function () {
    angular.module('eve')
        .controller('ProjectsCtrl', ['$scope', '$modal', 'projectsService', function ($scope, $modal, projectsService) {
            projectsService.getProjects().then(function (result) {
                $scope.projects = result;
            });

            $scope.addProject = function () {
                $modal.open({
                    templateUrl: globalPath + '/views/add-page.html',
                    controller: 'ModalProjectsCtrl',
                    resolve: {
                        modalData: function () {
                            return $scope.projects;
                        }
                    }
                });
            }
        }]);
})();
