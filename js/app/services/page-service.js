(function () {
    angular.module('eve')
        .service('pageService', ['$http', '$q', function ($http, $q) {

            // склонение числительных
            // пример использования:
            // getDeclOfNum(total, ['час', 'часа', 'часов'])
            // задаем вопрос к: 1, 3, 5
            this.getDeclOfNum = function (number, titles)
            {
                cases = [2, 0, 1, 1, 1, 2];
                return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
            };

            this.getTotalString = function (total) {
                return total + " " + this.getDeclOfNum(total, ['час', 'часа', 'часов']);
            };

            this.getPagesTotalTime = function (pages) {
                var total = 0;

                angular.forEach(pages, function (pages) {

                    angular.forEach(pages.pageTasks, function (task) {
                        total += task.taskTime;
                    });
                });

                return total;
            };

            this.getTypeData = function (type) {
                return {
                    dataUrl: '/json/' + type + '.json',
                    localId: 'app'+ type
                }
            };

            // забрать данные в localstorage
            this.getLastDataFromDb = function(pageUrl) {
                var pageTypeData = this.getTypeData(pageUrl);
                var deferred = $q.defer();
                var result = {
                    data: JSON.parse(localStorage.getItem(pageTypeData.localId))
                };
                deferred.resolve(result);
                return deferred.promise;
            };

            // забрать данные из файла
            this.getLastDataFromSrv = function(pageUrl) {
                var pageTypeData = this.getTypeData(pageUrl);
                return $http.get(pageTypeData.dataUrl);
            };

            this.getLastData = function (pageUrl) {
                var pageTypeData = this.getTypeData(pageUrl);
                if (localStorage.getItem(pageTypeData.localId) !== '' && localStorage.getItem(pageTypeData.localId) !== null) {
                    return this.getLastDataFromDb(pageUrl);
                } else {
                    return this.getLastDataFromSrv(pageUrl);
                }
            };

            this.setLastData = function (location, data) {
                localStorage.setItem(location, data);
            }

        }]);

})();
