var pm2webControllers = angular.module('rormobControllers', []),
    pm2webApp = angular.module('rormobApp', [
        'ngRoute',
        'rormobControllers'
    ]);

pm2webApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'partials/home',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
