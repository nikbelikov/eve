(function () {
    angular.module('eve')
        .directive('taskPage', function () {
            return {
                restrict: 'E',
                templateUrl: '/views/drv-task-page.html'
            }
        });
})();
