angular.module('modController')

.controller('EnchereController', function ($scope, $rootScope,$location, Constantes,partieService) {

    $scope.partie = partieService.getPartie();
    $scope.currentCouleur = Constantes.COULEUR_INDEFINIE;

    if ($scope.partie.historiqueMaine.length <= 1) {
        $scope.currentCouleurA = Constantes.COULEUR_INDEFINIE;
        $scope.currentCouleurB = Constantes.COULEUR_INDEFINIE;
    }
    else {
        if ($scope.partie.maine.equipeContrat == Constantes.EQUIPE_A) {
            $scope.currentCouleurA = $scope.partie.maine.couleur;
            var m = partieService.getLastMaineEquipe(Constantes.EQUIPE_B);
            if (m != null) {
                $scope.currentCouleurB = m.couleur;
            }
        }
        if ($scope.partie.maine.equipeContrat == Constantes.EQUIPE_B) {
            $scope.currentCouleurB = $scope.partie.maine.couleur;
            var m = partieService.getLastMaineEquipe(Constantes.EQUIPE_A);
            if (m != null) {
                $scope.currentCouleurA = m.couleur;
            }
        }
    }
        
    $scope.dealer = partieService.getDealer();

    $scope.C=Constantes;

    $scope.setCouleur=function(col){
        
        if ($scope.partie.heureStart == 0) {
            $scope.partie = partieService.startTime();
        }
        
        if (($scope.currentCouleur == col) || ($scope.isDisable('couleur') == true)) {
            $scope.currentCouleur =Constantes.COULEUR_INDEFINIE;
        }
        else {
            $scope.currentCouleur =col;
        }
    }

    $scope.retourEnchere = function () {
        $scope.partie = partieService.retourEnchere();
        if ($scope.partie.maine.equipeContrat == Constantes.EQUIPE_A) {
            $scope.currentCouleurA = $scope.partie.maine.couleur;
        }
        if ($scope.partie.maine.equipeContrat == Constantes.EQUIPE_B) {
            $scope.currentCouleurB = $scope.partie.maine.couleur;
        }
        if ($scope.partie.maine.equipeContrat == Constantes.EQUIPE_INDEFINIE) {
            $scope.currentCouleurA = Constantes.COULEUR_INDEFINIE;
            $scope.currentCouleurB = Constantes.COULEUR_INDEFINIE;
        }
        $scope.currentCouleur = Constantes.COULEUR_INDEFINIE;
    }

    $scope.avanceEnchere = function (a,e) {
        if ($scope.isDisable(a) == true) return;

        var col;
        if (e == Constantes.EQUIPE_A) {
            if($scope.currentCouleur != Constantes.COULEUR_INDEFINIE){
                col=$scope.currentCouleur;
                $scope.currentCouleurA=col;
            }
            else{
                col=$scope.currentCouleurA;
            }
        }
        else{
            if($scope.currentCouleur != Constantes.COULEUR_INDEFINIE){
                col=$scope.currentCouleur;
                $scope.currentCouleurB=col;
            }
            else{
                col=$scope.currentCouleurB;
            }
        }
        $scope.currentCouleur = Constantes.COULEUR_INDEFINIE;
        $scope.partie = partieService.avanceEnchere(e,col);
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

    $scope.contre = function () {
        $scope.partie = partieService.contre();
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

    $scope.getClasseNameCouleur = function (e) {
        var strActive="";
        var ret="";
        if ($scope.partie.maine.equipeContrat == e) {
            strActive = ' couleur-active-enchere';
        }

        if (e == Constantes.EQUIPE_A) {
            if ($scope.currentCouleurA == Constantes.COULEUR_COEUR) ret = "img-enchere coeur";
            if ($scope.currentCouleurA == Constantes.COULEUR_CARREAU) ret = "img-enchere carreau";
            if ($scope.currentCouleurA == Constantes.COULEUR_TREFFLE) ret = "img-enchere treffle";
            if ($scope.currentCouleurA == Constantes.COULEUR_PIQUE) ret = "img-enchere pique";
        }
        if (e == Constantes.EQUIPE_B) {
            if ($scope.currentCouleurB == Constantes.COULEUR_COEUR) ret = "img-enchere coeur";
            if ($scope.currentCouleurB == Constantes.COULEUR_CARREAU) ret = "img-enchere carreau";
            if ($scope.currentCouleurB == Constantes.COULEUR_TREFFLE) ret = "img-enchere treffle";
            if ($scope.currentCouleurB == Constantes.COULEUR_PIQUE) ret = "img-enchere pique";
        }

        return (ret + strActive );
    }

    $scope.getClasseNameEnchere = function (e) {
        var ret;
        var strBK ="equipeOff";
        var flagDisable = false;

        if (e == Constantes.EQUIPE_A) {
            if ($scope.partie.maine.equipeContrat == e) strBK = "equipeOn ";
            flagDisable = $scope.isDisable('avanceContratA');
        }
        if (e == Constantes.EQUIPE_B) {
            if ($scope.partie.maine.equipeContrat == e) strBK = "equipeOn";
            flagDisable = $scope.isDisable('avanceContratB');
        }
        if (flagDisable == false) {
            ret = "but-enchere ";
        }
        else {
            ret = "but-enchere disable ";
        }

        return (ret + strBK);
    }

    $scope.getClasseNameNomEquipeEnchere = function (e) {
        var ret = "bkX";
//        var ret = "bkX equipeOff";

        if (e == Constantes.EQUIPE_A) {
            if ($scope.partie.maine.equipeContrat == e) ret = "bkA-gradient";
       //     if ($scope.partie.maine.equipeContrat == e) ret = "bkA-gradient equipeOn";
        }
        if (e == Constantes.EQUIPE_B) {
            if ($scope.partie.maine.equipeContrat == e) ret = "bkB-gradient";
       //     if ($scope.partie.maine.equipeContrat == e) ret = "bkB-gradient equipeOn";
        }
        
        return (ret);
    }

    $scope.isDisable = function (key) {
        ret = false;
        do {
            if (key == 'retourEnchere') {
                if ($scope.partie.historiqueMaine.length <= 1) {
                    ret = true;
                    break;
                }
            }

            if (key == 'couleur') {
                if ($scope.partie.maine.flagContre == true) {
                    ret = true;
                    break;
                }
                if ($scope.partie.maine.indiceContrat == 9) { //Capo demandé
                    ret = true;
                    break;
                }
            }

            if (key == 'Start') {
                if ($scope.partie.historiqueMaine.length <= 1) {
                    ret = true;
                    break;
                }
            }

            if (key == 'Contre') {
                if ($scope.partie.historiqueMaine.length <= 1) {
                    ret = true;
                    break;
                }
            }

            if (key == 'SurContre') {
                if ($scope.partie.maine.flagSurContre == true) {
                    ret = true;
                    break;
                }
                if ($scope.partie.historiqueMaine.length <= 1) {
                    ret = true;
                    break;
                }
            }

            if (key == 'avanceContratA') {
                if ($scope.partie.maine.flagContre == true) {
                    ret = true;
                    break;
                }
                if ($scope.partie.maine.indiceContrat == 9) { //Capo demandé, fin des enchères classiques
                    ret = true;
                    break;
                }
                
                if (($scope.currentCouleur == Constantes.COULEUR_INDEFINIE) && ($scope.currentCouleurA == Constantes.COULEUR_INDEFINIE)){
                    ret = true;
                    break;
                }
            }

            if (key == 'avanceContratB') {
                if ($scope.partie.maine.flagContre == true) {
                    ret = true;
                    break;
                }
                if ($scope.partie.maine.indiceContrat == 9) { //Capo demandé, fin des enchères classiques
                    ret = true;
                    break;
                }
                if (($scope.currentCouleur == Constantes.COULEUR_INDEFINIE) && ($scope.currentCouleurB == Constantes.COULEUR_INDEFINIE)){
                    ret = true;
                    break;
                }
                
            }
        } while (false);
        return (ret);
    }
    
    $scope.start = function () {
        $location.path('/Partie')
    }

    $scope.retour = function () {
        $location.path('/Accueil')
    }

    $scope.passe = function () {
        $scope.partie = partieService.nextDealer();
        $scope.dealer = partieService.getDealer();
    }
});