angular.module('modController')

.controller('PartieController', function ($scope, $rootScope, toolsService,$location,Constantes,paramService, partieService) {

    $scope.partie = partieService.getPartie();

    $scope.dealer = partieService.getDealer();

    $scope.param= paramService.getParam();
    
    $scope.C = Constantes;


    function verifWinner(){
        if ($scope.partie.equipeA.score >= $scope.param.score) {
            $scope.partie = partieService.setWinner(Constantes.EQUIPE_A);
        }
        else {
            if ($scope.partie.equipeB.score >= $scope.param.score) {
                $scope.partie = partieService.setWinner(Constantes.EQUIPE_B);
            }
            else {
                $scope.partie = partieService.setWinner(Constantes.EQUIPE_INDEFINIE);
            }
        }
    }

    function stopAnnimation(e) {
        var divEquipe;

        if (e == Constantes.EQUIPE_A) {
            divEquipe = $("#winnerA");
        }
        else {
            divEquipe = $("#winnerB");
        }
        divEquipe.css("opacity", "0");

    }

    function startAnnimation(e) {
        var divEquipe;
        
        if(e == Constantes.EQUIPE_A){
            divEquipe=$("#winnerA");
        }
        else{
            divEquipe=$("#winnerB");
        }
        divEquipe.css("opacity", "1.0");
        

   
        
    }

    $scope.$watch('partie', function (newValue, OldValue) {
        if ($scope.partie.flagWinnerA == true) startAnnimation(Constantes.EQUIPE_A);
        else stopAnnimation(Constantes.EQUIPE_A);

        if ($scope.partie.flagWinnerB == true) startAnnimation(Constantes.EQUIPE_B);
        else stopAnnimation(Constantes.EQUIPE_B);
    }, true);

    //$scope.$watch('partie', function (newValue, OldValue) {
    //    if ($scope.partie.flagWinnerB == true) startAnnimation(Constantes.EQUIPE_B);
    //    else stopAnnimation(Constantes.EQUIPE_B);
    //}, true);


    $scope.getClasseNameCouleur = function (e) {
        var ret = "";

        if ($scope.partie.maine.couleur == Constantes.COULEUR_COEUR) ret = "coeur couleur-active-partie";
        if ($scope.partie.maine.couleur == Constantes.COULEUR_CARREAU) ret = "carreau couleur-active-partie";
        if ($scope.partie.maine.couleur == Constantes.COULEUR_TREFFLE) ret = "treffle couleur-active-partie";
        if ($scope.partie.maine.couleur == Constantes.COULEUR_PIQUE) ret = "pique couleur-active-partie";
        

        return (ret);
    }

    $scope.getClasseNameContre = function (e) {
        var ret = "";

        if ($scope.partie.maine.equipeContrat == e) {
            if ($scope.partie.maine.flagContre == true) {
                ret = "text-contre";
            }
            if ($scope.partie.maine.flagSurContre == true) {
                ret = "text-sur-contre";
            }
        }
        return (ret);
    }

    $scope.getLibelleContrat = function (e) {
        if ($scope.partie.maine.equipeContrat == e) {
            return ($scope.partie.maine.libelleContrat);
        }
        else {
            var maine = partieService.getLastMaineEquipe(e);
            if (maine != null) {
                return (maine.libelleContrat);
            }
            else {
                return ("");
            }
        }
    }
    
    $scope.retourEnchere = function () {
        if ($scope.partie.maine.flagCalcul == true) {
            partieService.startMaine();
        }
        $location.path('/Enchere');
    }

    $scope.contratOK = function () {

        $scope.partie = partieService.calculMaine(true);
        
        $scope.dealer = partieService.getDealer();
        verifWinner();
    }

    $scope.contratKO = function () {
        $scope.partie = partieService.calculMaine(false);
        $scope.dealer = partieService.getDealer();
        verifWinner();
    }

    var callBackRaz = function () {

        $scope.partie = partieService.annulMaine();
        $scope.dealer = partieService.getDealer();
        verifWinner();
    }

    $scope.annul = function () {
        $rootScope.DlgShow('popup_RazMaine.html', 'RazMaineController', null, callBackRaz, null);
        //callBackRaz();
    }

    $scope.stat = function () {
        $location.path('/Stat')
    }
    verifWinner();

    $scope.sendMail = function () {
        if (($scope.partie.equipeA.score >= $scope.param.score) || ($scope.partie.equipeB.score >= $scope.param.score)) {
            toolsService.sendMailVainqueur($scope.partie);
        }
    }
});