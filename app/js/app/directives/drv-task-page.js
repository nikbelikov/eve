"use strict";

(function () {
    angular.module('eve')
        .directive('taskPage', function () {
            return {
                restrict: 'E',
                templateUrl: globalPath + '/views/drv-task-page.html',
                controller: function ($scope, pageService, settingsService, $modal, $http, $timeout, $routeParams) {

                    $scope.layout = 'table';

                    var projects = JSON.parse(localStorage.getItem('project-list'));
                    var pageTitle = "";
                    var routeId = $routeParams.id;

                    projects.map(function (project) {
                        if (project.id === routeId) {
                            pageTitle = project.name;
                        }
                    });

                    $scope.pageTitle = pageTitle;

                    $scope.risks = settingsService.getRisks();

                    // отслеживаем изменение результата выполнения функции getLayoutView()
                    // когда изменилось, присваиваем для $scope.layout новое значение
                    $scope.$watch(function () {
                        return pageService.getLayoutView();
                    }, function (newLayout) {
                        $scope.layout = newLayout;
                    });

                    pageService.getLastData($routeParams.id).then(function (result) {
                        $scope.pages = result.data;
                    });

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
                        $scope.risksTime = Math.round($scope.totalTime * $scope.risks / 100);
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
                            templateUrl: globalPath + '/views/add-page.html',
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
                            templateUrl: globalPath + '/views/add-page.html',
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
                            templateUrl: globalPath + '/views/add-task.html',
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
                            templateUrl: globalPath + '/views/add-task.html',
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
                        pageService.setLastData($routeParams.id, JSON.stringify($scope.pages));

                        $scope.savedDataLabelShow = true;

                        $timeout(function () {
                            $scope.savedDataLabelShow = false;
                        }, 2000);
                    };

                    $scope.cancelEdits = function () {
                        pageService.getLastData($routeParams.id).then(function (result) {
                            $scope.pages = result.data;
                        });
                    };

                    $scope.elementMove = function (elements, index, direction) {
                        var oldElem = elements[index];
                        var newIndex;

                        if (direction === 'up') {
                            newIndex = index-1;
                        } else if (direction === 'down') {
                            newIndex = index+1;
                        }

                        elements.splice(index, 1);
                        elements.splice(newIndex, 0, oldElem);
                    };

                    $scope.goToPage = function () {
                        var ind = this.$index;
                        var el = document.querySelectorAll('h3')[ind];
                        var bodyRect = document.body.getBoundingClientRect();
                        var elRect = el.getBoundingClientRect();
                        var elPosition = elRect.top - bodyRect.top;

                        // скролл до нужного блока
                        window.scrollTo(0, elPosition);
                    };

                }
            }
        });
})();
