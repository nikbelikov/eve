"use strict";

(function () {
    angular.module('eve')
        .service('pageService', ['$http', '$q', function ($http, $q) {

            // вид представления по умолчанию ('table', 'clear', 'text')
            this.layout = 'table';

            this.getLayoutView = function () {
                return this.layout;
            };

            this.setLayoutView = function (layout) {
                this.layout = layout;
            };

            // склонение числительных
            // пример использования:
            // getDeclOfNum(total, ['час', 'часа', 'часов'])
            // задаем вопрос к: 1, 3, 5
            this.getDeclOfNum = function (number, titles)
            {
                var cases = [2, 0, 1, 1, 1, 2];
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

            this.getLastData = function (id) {
                var deferred = $q.defer();
                var result = {
                    data: JSON.parse(localStorage.getItem(id))
                };
                if (!result.data) {
                    result = {"data": []};
                }
                deferred.resolve(result);
                return deferred.promise;
            };

            this.setLastData = function (location, data) {
                localStorage.setItem(location, data);
            }

        }]);

})();
