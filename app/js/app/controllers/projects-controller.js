"use strict";

(function () {
    angular.module('eve')
        .controller('ProjectsCtrl', ['$scope', function ($scope) {
            $scope.projects = [
                {
                    "id": "ecber32v34vb3v43vv4b",
                    "name": "Проект 1",
                    "time": 120
                },
                {
                    "id": "cewe9ew7vwe90v7we902",
                    "name": "Проект 2",
                    "time": 25
                }
            ];
        }]);
})();
