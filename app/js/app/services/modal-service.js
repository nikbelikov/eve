(function () {
    "use strict";

    angular
        .module('eve')
        .service('modalService', modalService);

    function modalService () {
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
                    name: name
                };
                projects.push(newProject);
                localStorage.setItem('project-list', JSON.stringify(projects));
            }
        };

        this.editProjectTitle = function (project, newName) {
            if (newName !== '') {
                var oldName = project.name;
                var projects = JSON.parse(localStorage.getItem('project-list'));

                project.name = newName;

                projects.map(function (project) {
                    if (project.name === oldName) {
                        project.name = newName;
                    }
                });

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
    }
})();
