(function () {
    var app = angular.module('projeval');

    app.controller('ModalPageCtrl', function ($scope, $modalInstance, modalService, modalData) {

        // если редактируем название страницы
        if (modalData.page) {
            $scope.pageName = modalData.page.pageName;
        }

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
    });
})();
