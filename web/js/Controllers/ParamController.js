angular.module('modController')

.controller('ParamController', function ($scope, $rootScope, paramService, $location) {

    
    $scope.param = paramService.getParam();

    $scope.ok = function () {
        paramService.setParam($scope.param);
        $location.path('/Accueil');
    }
    
    $scope.cancel = function () {
        $location.path('/Accueil');
    }

    
});