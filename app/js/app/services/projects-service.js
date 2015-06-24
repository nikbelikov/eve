"use strict";

(function () {
    angular.module('eve')
        .service('projectsService', ['$q', function ($q) {

            this.getProjects = function () {
                var deferred = $q.defer();
                var result = JSON.parse(localStorage.getItem('project-list'));
                if (!result) {
                    result = [];
                }
                deferred.resolve(result);
                return deferred.promise;
            };

        }]);

})();
