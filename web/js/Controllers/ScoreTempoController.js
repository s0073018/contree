angular.module('modController')

.controller('ScoreTempoController', function ($scope, $rootScope, $timeout, toolsService, $location, Constantes, partieService, paramService) {

    $scope.param = paramService.getParam();

    $scope.partie = partieService.getPartie();

    $scope.dealer = partieService.getDealer();

    $scope.C = Constantes;

    $scope.duree = "";

    $scope.closeTempo = function () {
        $scope.showScoreTempo(false);
    }

    function callAtTimeout() {
        $scope.param = paramService.getParam();
        $scope.dealer = partieService.getDealer();
        $scope.partie = partieService.getPartie();
        if ($scope.partie.heureStart == 0) {
            $scope.duree = "";
            $timeout(callAtTimeout, 300);
            return;
        }
        var d = new Date();
        var dif = d.getTime() - $scope.partie.heureStart;

        var tmp = Math.floor(dif / 1000);             // Nombre de secondes entre les 2 dates
        var s = tmp % 60;                    // Extraction du nombre de secondes

        tmp = Math.floor((tmp - s) / 60);    // Nombre de minutes (partie entière)
        var m = tmp % 60;                    // Extraction du nombre de minutes

        var str = "";
        if(m > 0){
            str= m + "mn ";
        }
        
        if ((s < 10) && (m != 0)) str = str + "0";
        str = str + s + "s";
        $scope.duree = str;
        $timeout(callAtTimeout, 300);
        return;
    }

    $timeout(callAtTimeout, 300);





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
    
    
});