(function () {
    "use strict";

    angular
        .module('eve')
        .service('projectsService', projectsService);

    function projectsService ($q) {

        this.getProjects = function () {
            var deferred = $q.defer();
            var result = JSON.parse(localStorage.getItem('project-list'));
            if (!result) {
                result = [];
            }
            deferred.resolve(result);
            return deferred.promise;
        };

    }

})();
