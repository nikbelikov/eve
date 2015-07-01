(function () {
    "use strict";

    angular
        .module('eve')
        .controller('ModalPageCtrl', ModalPageCtrl);

    ModalPageCtrl.$inject = ['$modalInstance', 'modalService', 'modalData'];

    function ModalPageCtrl ($modalInstance, modalService, modalData) {

        var vm = this;

        // если редактируем название страницы
        if (modalData.page) {
            vm.pageName = modalData.page.pageName;
        }

        // заголовок окна в зависимости от того,
        // редактируем ли мы название страницы или
        // добавляем новую
        vm.modalTitle = modalData.page ? 'Редактировать название' : 'Добавить страницу';

        vm.ok = function () {
            // если редактируем название страницы
            if (modalData.page) {
                $modalInstance.close(modalService.editPageTitle(modalData.page, vm.pageName));
                // если добавляем новую страницу
            } else {
                $modalInstance.close(modalService.addNewPage(modalData, vm.pageName));
            }
        };

        vm.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }

})();
