(function () {
    var app = angular.module('eve');

    app.service('pageService', ['$http', '$q', function ($http, $q) {

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

        // забрать данные в localstorage
        this.getLastDataFromDb = function() {
            var deferred = $q.defer();
            var result = {
                data: JSON.parse(localStorage.getItem('appData'))
            };
            deferred.resolve(result);
            return deferred.promise;
        };

        // забрать данные из файла
        this.getLastDataFromSrv = function() {
            return $http.get('/data.json');
        };

        this.getLastData = function () {
            if (localStorage.getItem('appData') !== '' && localStorage.getItem('appData') !== null) {
                return this.getLastDataFromDb();
            } else {
                return this.getLastDataFromSrv();
            }
        };

    }]);

})();
