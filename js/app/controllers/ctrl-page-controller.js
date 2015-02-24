(function () {
    var app = angular.module('eve');

    app.controller('PageCtrl', function ($scope, pageService, $modal, $http, $timeout) {

        $scope.pages = pageService.getLastData();

        $scope.pagesTotalTime = 0;
        $scope.risksTime = 0;

        $scope.savedDataLabelShow = false;

        // время отдельно для каждой страницы
        $scope.pageTotalTime = function (page) {
            var total = 0;

            angular.forEach(page.pageTasks, function (el) {
                total += el.taskTime;
            });

            return pageService.getTotalString(total);
        };

        // риски (% от общего количества времени)
        $scope.riskTime = function () {
            $scope.risksTime = Math.round($scope.totalTime * 0.1);
            return pageService.getTotalString($scope.risksTime);
        };

        // общее время на все страницы
        $scope.pagesTotalTime = function (pages) {
            $scope.totalTime = pageService.getPagesTotalTime(pages);
            return pageService.getTotalString($scope.totalTime);
        };

        // общее время с рисками
        $scope.commonTotalTime = function () {
            return pageService.getTotalString($scope.totalTime + $scope.risksTime);
        };

        $scope.addPage = function () {
            $modal.open({
                templateUrl: '/js/app/views/add-page.html',
                controller: 'ModalPageCtrl',
                resolve: {
                    modalData: function () {
                        return $scope.pages;
                    }
                }
            });
        };

        $scope.removePage = function (pages, index) {
            pages.splice(index, 1);
        };

        $scope.editPageTitle = function (page) {
            $modal.open({
                templateUrl: '/js/app/views/add-page.html',
                controller: 'ModalPageCtrl',
                resolve: {
                    modalData: function () {
                        return {
                            page: page
                        };
                    }
                }
            });
        };

        $scope.addTask = function (page) {
            $modal.open({
                templateUrl: '/js/app/views/add-task.html',
                controller: 'ModalTaskCtrl',
                resolve: {
                    modalData: function () {
                        return {
                            page: page
                        };
                    }
                }
            });
        };

        $scope.removeTask = function (page, index) {
            page.pageTasks.splice(index, 1);
        };

        $scope.editTask = function (task) {
            $modal.open({
                templateUrl: '/js/app/views/add-task.html',
                controller: 'ModalTaskCtrl',
                resolve: {
                    modalData: function () {
                        return {
                            task: task
                        };
                    }
                }
            });
        };

        $scope.saveData = function () {
            localStorage.setItem('appData', JSON.stringify($scope.pages));
            $scope.savedDataLabelShow = true;
            $timeout(function () {
                $scope.savedDataLabelShow = false;
            }, 2000);
        };

        $scope.cancelEdits = function () {
            $scope.pages = pageService.getLastData();
        };
    });
})();
