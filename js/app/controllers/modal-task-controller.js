(function () {
    var app = angular.module('eve');

    app.controller('ModalTaskCtrl', ['$scope', '$modalInstance', 'modalService', 'modalData', function ($scope, $modalInstance, modalService, modalData) {

        // если редактируем задачу
        if (modalData.task) {
            $scope.task = {
                taskName: modalData.task.taskName,
                taskDesc: modalData.task.taskDesc
            };
        }

        $scope.ok = function () {
            // если добавляем задачу
            if (modalData.page) {
                $modalInstance.close(modalService.addNewTask(modalData.page, $scope.task));
            }
            // если редактируем задачу
            if (modalData.task) {
                $modalInstance.close(modalService.editTask(modalData.task, $scope.task));
            }
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

})();
