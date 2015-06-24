"use strict";

(function () {
    angular.module('eve')
        .controller('ModalProjectsCtrl', ['$scope', '$modalInstance', 'modalService', 'modalData', function ($scope, $modalInstance, modalService, modalData) {

            $scope.modalTitle =  'Добавить проект';

            $scope.ok = function () {
                // если редактируем название проекта
                //if (modalData.page) {
                //    $modalInstance.close(modalService.editProjectTitle(modalData.page, $scope.pageName));
                //    // если добавляем новый проект
                //} else {
                //    $modalInstance.close(modalService.addNewPproject(modalData, $scope.pageName));
                //}

                $modalInstance.close(modalService.addNewProject(modalData, $scope.pageName));
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

        }]);

})();
