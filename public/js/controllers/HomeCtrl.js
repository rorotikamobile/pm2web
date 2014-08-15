pm2webControllers.controller('HomeCtrl', ['$scope', '$http',
    function($scope, $http) {
        var statusClasses = {
            online: 'list-group-item-success',
            stopped: 'list-group-item-danger'
        };

        $http.get('/process').success(function(processes) {
            console.log(processes);
            $scope.processes = processes;
        });

        $scope.getStatusClass = function(status) {
            return statusClasses[status];
        };

        $scope.getProcessDetail = function(name) {
            $http.get('/process/' + name).success(function(process) {
                console.log(process);
                alert(process);
            });
        };

        $scope.startProcess = function(pid) {
        };

        $scope.stopProcess = function(pid) {

        };

        $scope.restartProcess = function(pid) {

        };
    }]);
