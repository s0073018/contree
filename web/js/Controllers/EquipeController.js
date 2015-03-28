angular.module('modController')

.controller('EquipeController', function ($scope, $rootScope,toolsService,partieService,joueurService,Constantes, $location) {

    $scope.C = Constantes;
    $scope.partie = angular.copy(partieService.getPartie());
    $scope.listeJoueur = [];
    $scope.joueurSel = null;

    function setListeJoueur(l) {
        var elem;

        $scope.listeJoueur = [];

        for (var i = 0; i < l.length; i++) {
            elem = {
                'nom': l[i],
                'indice' : i,
            }
            $scope.listeJoueur.push(elem);
        }
        
    }

    setListeJoueur(joueurService.getListeJoueur());

    var callBackDel = function (j) {

        var l = joueurService.removeJoueur(j.indice);
        setListeJoueur(l);
    }

    $scope.removeJoueur = function (j) {
        $rootScope.DlgShow('popup_DelJoueur.html', 'DelJoueurController', j, callBackDel, null);

    }

    $scope.ok = function () {
        partieService.setPartie($scope.partie);
        $location.path('/Accueil');
    }
    
    $scope.cancel = function () {
        $location.path('/Accueil');
    }

    var callBackJoueur = function(nom){
        setListeJoueur(joueurService.addNom(toolsService.formatNom(nom)));
    }

    $scope.addNom = function () {
        $rootScope.DlgShow('popup_AddJoueur.html','AddJoueurController', null, callBackJoueur, null);
    }

    $scope.selectJoueur = function (j) {
        $scope.joueurSel = j;
    }

    $scope.addEquipe = function (e,nr) {
        if ($scope.joueurSel != null) {
            if (e == Constantes.EQUIPE_A) {
                if (nr == 1) $scope.partie.equipeA.joueur1 = toolsService.formatNom($scope.joueurSel.nom);
                if (nr == 2) $scope.partie.equipeA.joueur2 = toolsService.formatNom($scope.joueurSel.nom);
            }
            if (e == Constantes.EQUIPE_B) {
                if (nr == 1) $scope.partie.equipeB.joueur1 = toolsService.formatNom($scope.joueurSel.nom);
                if (nr == 2) $scope.partie.equipeB.joueur2 = toolsService.formatNom($scope.joueurSel.nom);
            }
        }
    }
});