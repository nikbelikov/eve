(function () {
    var app = angular.module('projeval');

    app.directive('taskPage', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/app/views/drv-task-page.html'
        }
    });
})();
