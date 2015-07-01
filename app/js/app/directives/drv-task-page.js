(function () {
    "use strict";

    angular
        .module('eve')
        .directive('taskPage', taskPage);

    function taskPage () {
        return {
            restrict: 'E',
            templateUrl: globalPath + '/views/drv-task-page.html',
            controller: TaskPageCtrl,
            controllerAs: 'taskPageCtrl'
        };

        function TaskPageCtrl ($scope, pageService, settingsService, $modal, $timeout, $routeParams) {

            var vm = this;

            vm.layout = 'table';

            var projects = JSON.parse(localStorage.getItem('project-list'));
            var pageTitle = "";
            var routeId = $routeParams.id;

            projects.map(function (project) {
                if (project.id === routeId) {
                    pageTitle = project.name;
                }
            });

            vm.pageTitle = pageTitle;

            vm.risks = settingsService.getRisks();

            // отслеживаем изменение результата выполнения функции getLayoutView()
            // когда изменилось, присваиваем для vm.layout новое значение
            $scope.$watch(function () {
                return pageService.getLayoutView();
            }, function (newLayout) {
                vm.layout = newLayout;
            });

            pageService.getLastData($routeParams.id).then(function (result) {
                vm.pages = result.data;
            });

            vm.pagesTotalTime = 0;
            vm.risksTime = 0;

            vm.savedDataLabelShow = false;

            // время отдельно для каждой страницы
            vm.pageTotalTime = function (page) {
                var total = 0;

                angular.forEach(page.pageTasks, function (el) {
                    total += el.taskTime;
                });

                return pageService.getTotalString(total);
            };

            // риски (% от общего количества времени)
            vm.riskTime = function () {
                vm.risksTime = Math.round(vm.totalTime * vm.risks / 100);
                return pageService.getTotalString(vm.risksTime);
            };

            // общее время на все страницы
            vm.pagesTotalTime = function (pages) {
                vm.totalTime = pageService.getPagesTotalTime(pages);
                return pageService.getTotalString(vm.totalTime);
            };

            // общее время с рисками
            vm.commonTotalTime = function () {
                return pageService.getTotalString(vm.totalTime + vm.risksTime);
            };

            vm.addPage = function () {
                $modal.open({
                    templateUrl: globalPath + '/views/add-page.html',
                    controller: 'ModalPageCtrl',
                    controllerAs: 'modalPageCtrl',
                    resolve: {
                        modalData: function () {
                            return vm.pages;
                        }
                    }
                });
            };

            vm.removePage = function (pages, index) {
                pages.splice(index, 1);
            };

            vm.editPageTitle = function (page) {
                $modal.open({
                    templateUrl: globalPath + '/views/add-page.html',
                    controller: 'ModalPageCtrl',
                    controllerAs: 'modalPageCtrl',
                    resolve: {
                        modalData: function () {
                            return {
                                page: page
                            };
                        }
                    }
                });
            };

            vm.addTask = function (page) {
                $modal.open({
                    templateUrl: globalPath + '/views/add-task.html',
                    controller: 'ModalTaskCtrl',
                    controllerAs: 'modalTaskCtrl',
                    resolve: {
                        modalData: function () {
                            return {
                                page: page
                            };
                        }
                    }
                });
            };

            vm.removeTask = function (page, index) {
                page.pageTasks.splice(index, 1);
            };

            vm.editTask = function (task) {
                $modal.open({
                    templateUrl: globalPath + '/views/add-task.html',
                    controller: 'ModalTaskCtrl',
                    controllerAs: 'modalTaskCtrl',
                    resolve: {
                        modalData: function () {
                            return {
                                task: task
                            };
                        }
                    }
                });
            };

            vm.saveData = function () {
                pageService.setLastData($routeParams.id, JSON.stringify(vm.pages));

                vm.savedDataLabelShow = true;

                $timeout(function () {
                    vm.savedDataLabelShow = false;
                }, 2000);
            };

            vm.cancelEdits = function () {
                pageService.getLastData($routeParams.id).then(function (result) {
                    vm.pages = result.data;
                });
            };

            vm.elementMove = function (elements, index, direction) {
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

            vm.goToPage = function (index) {
                var el = document.querySelectorAll('h3')[index];
                var bodyRect = document.body.getBoundingClientRect();
                var elRect = el.getBoundingClientRect();
                var elPosition = elRect.top - bodyRect.top;

                // скролл до нужного блока
                window.scrollTo(0, elPosition);
            };

        }
    }
})();
