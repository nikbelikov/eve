(function () {
    var app = angular.module('eve');

    app.controller('ModalPageCtrl', ['$scope', '$modalInstance', 'modalService', 'modalData', function ($scope, $modalInstance, modalService, modalData) {

        // если редактируем название страницы
        if (modalData.page) {
            $scope.pageName = modalData.page.pageName;
        }

        // заголовок окна в зависимости от того,
        // редактируем ли мы название страницы или
        // добавляем новую
        $scope.modalTitle = modalData.page ? 'Редактировать название' : 'Добавить страницу';

        $scope.ok = function () {
            // если редактируем название страницы
            if (modalData.page) {
                $modalInstance.close(modalService.editPageTitle(modalData.page, $scope.pageName));
                // если добавляем новую страницу
            } else {
                $modalInstance.close(modalService.addNewPage(modalData, $scope.pageName));
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

})();
