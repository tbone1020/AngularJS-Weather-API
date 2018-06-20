// CONTROLLERS
weatherApp.controller('mainController', ['$scope', '$cityService', function($scope, $cityService) {
    $scope.city = $cityService.city;

    $scope.$watch('city', function() {
        $cityService.city = $scope.city;
    });


}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$cityService', '$routeParams', function($scope, $resource, $cityService,$routeParams) {
    $scope.city = $cityService.city;
    $scope.totalDays = $routeParams.days || '3';

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast?APPID=<APPID>", {
            callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});


    $scope.weatherResult = $scope.weatherAPI.get({ q:$scope.city, cnt: $scope.totalDays });

    $scope.convertToFahrenheit = function(degK){
        return Math.round((1.8 * (degK - 273)) + 32);
    }

    $scope.convertDate = function(dt){
        return new Date(dt * 1000);
    }

}]);
