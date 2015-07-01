(function () {
    "use strict";

    angular
        .module('eve')
        .controller('ProjectsCtrl', ProjectsCtrl);

    ProjectsCtrl.$inject = ['$modal', 'projectsService'];

    function ProjectsCtrl ($modal, projectsService) {

        var vm = this;

        projectsService.getProjects().then(function (result) {
            vm.projects = result;
        });

        vm.addProject = function () {
            $modal.open({
                templateUrl: globalPath + '/views/add-page.html',
                controller: 'ModalProjectsCtrl',
                controllerAs: 'modalPageCtrl',
                resolve: {
                    modalData: function () {
                        return vm.projects;
                    }
                }
            });
        };

        vm.editProject = function (project) {
            $modal.open({
                templateUrl: globalPath + '/views/add-page.html',
                controller: 'ModalProjectsCtrl',
                controllerAs: 'modalPageCtrl',
                resolve: {
                    modalData: function () {
                        return {
                            project: project
                        };
                    }
                }
            })
        };

        vm.removeProject = function (projects, id, index) {
            projects.splice(index, 1);
            localStorage.setItem('project-list', JSON.stringify(projects));
            localStorage.removeItem(id);
        }
    }
})();
