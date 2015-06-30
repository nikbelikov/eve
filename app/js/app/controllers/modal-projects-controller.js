(function () {
    "use strict";

    angular
        .module('eve')
        .controller('ModalProjectsCtrl', ModalProjectsCtrl);

    ModalProjectsCtrl.$inject = ['$scope', '$modalInstance', 'modalService', 'modalData'];

    function ModalProjectsCtrl ($scope, $modalInstance, modalService, modalData) {

        $scope.modalTitle = 'Добавить проект';

        // если редактируем название проекта
        if (modalData.project) {
            $scope.pageName = modalData.project.name;
            $scope.modalTitle = 'Редактировать название';
        }

        $scope.ok = function () {

            // если редактируем название проекта
            if (modalData.project) {
                $modalInstance.close(modalService.editProjectTitle(modalData.project, $scope.pageName));
                // если добавляем новый проект
            } else {
                $modalInstance.close(modalService.addNewProject(modalData, $scope.pageName));
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
