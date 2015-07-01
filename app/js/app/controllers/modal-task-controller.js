(function () {
    "use strict";

    angular
        .module('eve')
        .controller('ModalTaskCtrl', ModalTaskCtrl);

    ModalTaskCtrl.$inject = ['$modalInstance', 'modalService', 'modalData'];

    function ModalTaskCtrl ($modalInstance, modalService, modalData) {

        var vm = this;

        // если редактируем задачу
        if (modalData.task) {
            vm.task = {
                taskName: modalData.task.taskName,
                taskDesc: modalData.task.taskDesc
            };
        }

        // заголовок окна в зависимости от того,
        // редактируем ли мы название задачи или
        // добавляем новую
        vm.modalTitle = modalData.page ? 'Добавить задачу' : 'Редактировать задачу';

        vm.ok = function () {
            // если добавляем задачу
            if (modalData.page) {
                $modalInstance.close(modalService.addNewTask(modalData.page, vm.task));
            }
            // если редактируем задачу
            if (modalData.task) {
                $modalInstance.close(modalService.editTask(modalData.task, vm.task));
            }
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
