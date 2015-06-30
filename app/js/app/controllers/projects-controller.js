(function () {
    "use strict";

    angular
        .module('eve')
        .controller('ProjectsCtrl', ProjectsCtrl);

    ProjectsCtrl.$inject = ['$scope', '$modal', 'projectsService'];

    function ProjectsCtrl ($scope, $modal, projectsService) {

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
        };

        $scope.editProject = function (project) {
            $modal.open({
                templateUrl: globalPath + '/views/add-page.html',
                controller: 'ModalProjectsCtrl',
                resolve: {
                    modalData: function () {
                        return {
                            project: project
                        };
                    }
                }
            })
        };

        $scope.removeProject = function (projects, id, index) {
            projects.splice(index, 1);
            localStorage.setItem('project-list', JSON.stringify(projects));
            localStorage.removeItem(id);
        }
    }
})();
