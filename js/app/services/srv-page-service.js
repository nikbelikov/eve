(function () {
    var app = angular.module('eve');

    app.service('pageService', function () {

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

        this.getLastData = function () {
            if (localStorage.getItem('appData') !== '' && localStorage.getItem('appData') !== null) {
                return JSON.parse(localStorage.getItem('appData'));
            } else {
                $http.get('/data.json').success(function (jsonData) {
                    return jsonData;
                });
            }
        };

    });
})();
