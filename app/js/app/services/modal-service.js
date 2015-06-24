"use strict";

(function () {
    angular.module('eve')
        .service('modalService', function () {
            this.generateId = function (chars, length, noRepeat) {
                var res = '';
                var r;
                var i;
                for (i = 1; i <= length; i++) {
                    r = Math.floor(Math.random() * chars.length);
                    res = res + chars.substring(r,r+1);
                    if (noRepeat === 'true' || noRepeat === true){
                        chars = chars.replace(chars.substring(r,r+1), '');
                    }
                }
                res = res.replace("&","&amp;");
                res = res.replace(">","&gt;");
                res = res.replace("<","&lt;");
                return res;
            };

            this.addNewProject = function (projects, name) {
                var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
                var length = 20;
                var noRepeat = false;

                if (name) {
                    var newProject = {
                        id: this.generateId(chars, length, noRepeat),
                        name: name,
                        time: 0
                    };
                    projects.push(newProject);
                    localStorage.setItem('project-list', JSON.stringify(projects));
                }
            };

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
                if (task && task.taskName) {
                    task.taskTime = 0;
                    if (!task.taskDesc) {
                        task.taskDesc = 'нет описания';
                    }

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
