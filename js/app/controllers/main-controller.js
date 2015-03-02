(function () {
    angular.module('eve')
        .controller('MainCtrl', ['$scope', '$location', function ($scope, $routeParams) {
            $scope.currentMenuItem = $routeParams.$$url.split('/')[1];
        }]);

})();
