(function () {
    "use strict";

    angular
        .module('eve')
        .controller('ModalProjectsCtrl', ModalProjectsCtrl);

    ModalProjectsCtrl.$inject = ['$modalInstance', 'modalService', 'modalData'];

    function ModalProjectsCtrl ($modalInstance, modalService, modalData) {

        var vm = this;

        vm.modalTitle = 'Добавить проект';

        // если редактируем название проекта
        if (modalData.project) {
            vm.pageName = modalData.project.name;
            vm.modalTitle = 'Редактировать название';
        }

        vm.ok = function () {

            // если редактируем название проекта
            if (modalData.project) {
                $modalInstance.close(modalService.editProjectTitle(modalData.project, vm.pageName));
                // если добавляем новый проект
            } else {
                $modalInstance.close(modalService.addNewProject(modalData, vm.pageName));
            }
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
