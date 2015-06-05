(function () {
    angular.module('eve')
        .service('modalService', function () {
            this.addNewPage = function (pages, name) {
                if (name) {
                    var newPage = {
                        pageName: name,
                        pageTasks: []
                    };
                    pages.push(newPage);
                }
            };

            this.editPageTitle = function (oldPage, newTitle) {
                if (newTitle !== '') {
                    oldPage.pageName = newTitle;
                }
            };

            this.addNewTask = function (page, task) {
                if (task && task.taskName && task.taskDesc) {
                    task.taskTime = 0;
                    page.pageTasks.push(task);
                }
            };

            this.editTask = function (oldTask, newTask) {
                if (newTask.taskName) {
                    oldTask.taskName = newTask.taskName;
                    oldTask.taskDesc = newTask.taskDesc;
                }
            };
        });
})();
