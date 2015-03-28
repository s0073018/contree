angular.module('modController')

.controller('AccueilController', function ($scope,$window, $timeout,$rootScope,partieService, $location) {

    
    $scope.partie = partieService.getPartie();
    
    $scope.setDealer = function (d) {
        $scope.partie = partieService.setDealer(d);
    }

    $scope.isPartieComplete = function () {
        return (partieService.isPartieComplete());
    }

    $scope.start = function () {
        $location.path('/Enchere')
    }
    
    $scope.param = function () {
        $location.path('/Param')
    }

    var callBackRaz = function (flagJoueur) {

        $scope.partie = partieService.razPartie(!flagJoueur);
    }

    $scope.raz = function () {
                  
        $rootScope.DlgShow('popup_RazPartie.html', 'RazPartieController', null, callBackRaz, null);
    }

    $scope.modif = function () {
        $location.path('/Equipe');
    }

});