angular.module('modService')

.factory('joueurService', function (persistService) {
        
    //var listeJoueur = ["Gilles", "Jérome", "Cédric", "Christophe","Arnaud","Samy","Guillaume","Stephane"];
    //var listeJoueur = [];


    var listeJoueur = persistService.get('ListeJoueur');
    
    if (listeJoueur == null) {
        listeJoueur=[];
    }

    var getListeJoueur = function () {
        return (listeJoueur);
    }

    var addNom = function (nom) {
        listeJoueur.push(nom);
        persistService.set('ListeJoueur',listeJoueur);
        return (listeJoueur);
    }

    var delListeJoueur = function () {
        listeJoueur = [];
        persistService.remove('ListeJoueur');
    }

    var removeJoueur = function (indice) {
        listeJoueur.splice(indice, 1);
        persistService.set('ListeJoueur', listeJoueur);
        return (listeJoueur);
    }

    return {
            getListeJoueur: getListeJoueur,
            addNom: addNom,
            delListeJoueur: delListeJoueur,
            removeJoueur:removeJoueur
        };
});