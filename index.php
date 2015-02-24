<!DOCTYPE html>
<html>

<head>
    <title>eve</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.13/angular.min.js"></script>
    <script src="js/ui-bootstrap-custom-0.12.0.min.js"></script>
    <script src="js/ui-bootstrap-custom-tpls-0.12.0.min.js"></script>

    <script src="js/app/app.js"></script>
    <script src="js/app/services/srv-page-service.js"></script>
    <script src="js/app/services/srv-modal-service.js"></script>
    <script src="js/app/controllers/ctrl-page-controller.js"></script>
    <script src="js/app/controllers/ctrl-modal-controller.js"></script>
    <script src="js/app/controllers/ctrl-modal-task-controller.js"></script>
    <script src="js/app/directives/drv-task-page.js"></script>
</head>

<body ng-app="eve">

<header>
    <nav class="navbar navbar-inverse" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="/">eve</a>
            </div>
        </div>
    </nav>
</header>

<task-page></task-page>

<footer>
    <div class="container text-center">
        <p>2015 © eve</p>
    </div>
</footer>

</body>

</html>
