angular.module('modService')

.factory('partieService', function (Constantes, persistService) {

    var partie ={}; 
    
    function savePartie() {
        persistService.set('Partie', partie);
    }
    function getNewMaine() {
        var newMaine = {
            'couleur': Constantes.COULEUR_INDEFINIE,
            'indiceContrat': -1,
            'libelleContrat': '',
            'equipeContrat': Constantes.EQUIPE_INDEFINIE,
            'flagContre': false,
            'flagSurContre': false,
            'succes': false,
            'equipeGagnante': Constantes.EQUIPE_INDEFINIE,
            'points': 0,
            'flagCalcul' : false
        };
        return (newMaine);
    }

    function getNewPartie() {
        var newPartie = {
            'heureStart':0,
            'equipeA':
                {
                    'score' : 0,
                    'nomEquipe': Constantes.EQUIPE_A,
                    'joueur1': Constantes.JOUEUR_NON_RENSEIGNE,
                    'joueur2': Constantes.JOUEUR_NON_RENSEIGNE
                },
            'equipeB':
                {
                    'score': 0,
                    'nomEquipe': Constantes.EQUIPE_B,
                    'joueur1': Constantes.JOUEUR_NON_RENSEIGNE,
                    'joueur2': Constantes.JOUEUR_NON_RENSEIGNE
                },
            'maine' : getNewMaine(),
            'dealer' : 1,    
            'historiqueMaine': [],
            'historiquePartie': [],
            'flagWinnerA': false,
            'flagWinnerB':false
        }

        newPartie.historiqueMaine.push(newPartie.maine);

        return (newPartie);
    }

    var tabContrat = [
        { 
            'libelle': "80",
            'valeur': 80
        },
        {
            'libelle': "90",
            'valeur': 90
        },
        {
            'libelle': "100",
            'valeur': 100
        },
        {
            'libelle': "110",
            'valeur': 110
        },
        {
            'libelle': "120",
            'valeur': 120
        },
        {
            'libelle': "130",
            'valeur': 130
        },
        {
            'libelle': "140",
            'valeur': 140
        },
        {
            'libelle': "150",
            'valeur': 150
        },
        {
            'libelle': "160",
            'valeur': 160
        },
        {
            'libelle': "Capo",
            'valeur': 250
        },
    ]

    var razPartie = function (flagRazJoueur) {
        var newPartie = getNewPartie();
        if (flagRazJoueur == false) {
            newPartie.equipeA.joueur1 = partie.equipeA.joueur1;
            newPartie.equipeA.joueur2 = partie.equipeA.joueur2;
            newPartie.equipeB.joueur1 = partie.equipeB.joueur1;
            newPartie.equipeB.joueur2 = partie.equipeB.joueur2;
        }
        partie = newPartie;
        savePartie();
        return (partie);
    }

    var setDealer = function (d) {
        partie.dealer = d;
        savePartie();
        return (partie);
    }

    var startTime = function () {
        var d = new Date();
        partie.heureStart = d.getTime();
        savePartie();
        return (partie);
    }

    var getDealer = function () {
        var d = {
            'nomDealer': "",
            'nomDonneur': "",
            "equipeDealer": Constantes.EQUIPE_A,
            "equipeDonneur": Constantes.EQUIPE_A
        }
        switch (partie.dealer) {
            case 1:
                d.nomDonneur = partie.equipeB.joueur2;
                d.equipeDonneur = Constantes.EQUIPE_B;
                d.nomDealer = partie.equipeA.joueur1;
                d.equipeDealer = Constantes.EQUIPE_A;
                break;
            case 2:
                d.nomDonneur = partie.equipeA.joueur1;
                d.equipeDonneur = Constantes.EQUIPE_A;
                d.nomDealer = partie.equipeB.joueur1;
                d.equipeDealer=Constantes.EQUIPE_B;
                break;
            case 3:
                d.nomDonneur = partie.equipeB.joueur1;
                d.equipeDonneur = Constantes.EQUIPE_B;
                d.nomDealer = partie.equipeA.joueur2;
                d.equipeDealer=Constantes.EQUIPE_A;
                break;
            case 4:
                d.nomDonneur = partie.equipeA.joueur2;
                d.equipeDonneur = Constantes.EQUIPE_A;
                d.nomDealer = partie.equipeB.joueur2;
                d.equipeDealer=Constantes.EQUIPE_B;
                break;
        }

        return (d);
    }

    var nextDealer = function () {
        partie.dealer++;
        if (partie.dealer > 4) partie.dealer = 1;
        savePartie();
        return (partie);
    }

    var prevDealer = function () {
        partie.dealer--;
        if (partie.dealer <1) partie.dealer = 4;
        savePartie();
        return (partie);
    }

    var annulMaine = function () {

        var lastMaine = partie.historiquePartie[partie.historiquePartie.length - 1];
        if (lastMaine.equipeGagnante == Constantes.EQUIPE_A) {
            partie.equipeA.score -= lastMaine.points;
        }
        else {
            partie.equipeB.score -= lastMaine.points;
        }
        partie.historiquePartie.splice(partie.historiquePartie.length - 1, 1);
        prevDealer();
        partie.maine = lastMaine;
        partie.maine.flagCalcul = false;
        savePartie();
        return (partie);
    }

    var getLastMaineEquipe = function (e) {
        ret = null;
        for (var i = partie.historiqueMaine.length - 1; i >= 0; i--) {
            if (partie.historiqueMaine[i].equipeContrat == e) {
                ret = partie.historiqueMaine[i];
                break;
            }
        }
        return (ret);
    }

    var calculMaine = function (succes) {
        var c=getContrat(partie.maine.indiceContrat);

        partie.maine.succes = succes;
        partie.maine.points = c.valeur;
        partie.maine.equipeGagnante = partie.maine.equipeContrat;
        
        if (partie.maine.succes == false) {
            if (partie.maine.equipeGagnante == Constantes.EQUIPE_A) partie.maine.equipeGagnante = Constantes.EQUIPE_B;
            else partie.maine.equipeGagnante = Constantes.EQUIPE_A;

            if (partie.maine.points <= 160) partie.maine.points = 160;
            else partie.maine.points = 250;

            if (partie.maine.flagContre == true) partie.maine.points=partie.maine.points * 2;
            if (partie.maine.flagSurContre == true) partie.maine.points = partie.maine.points * 2;
        }
        else {
            if (partie.maine.flagContre == true) {
                if (partie.maine.points <= 160) partie.maine.points = 160;
                else partie.maine.points = 250;
                partie.maine.points=partie.maine.points * 2;
            }
            if (partie.maine.flagSurContre == true) partie.maine.points = partie.maine.points * 2;
        }

        
        if (partie.maine.equipeGagnante == Constantes.EQUIPE_A) {
            partie.equipeA.score += partie.maine.points;
        }
        else {
            partie.equipeB.score += partie.maine.points;
        }

        partie.maine.flagCalcul = true;

        partie.historiquePartie.push(partie.maine);
        nextDealer();

        savePartie();
        return (partie);
    }

    var contre = function () {
        var newMaine = getNewMaine();

        newMaine.equipeContrat = partie.maine.equipeContrat;
        newMaine.indiceContrat = partie.maine.indiceContrat;
        newMaine.libelleContrat = getContrat(newMaine.indiceContrat).libelle;
        newMaine.couleur = partie.maine.couleur;

        if (partie.maine.flagContre == false) {
            newMaine.flagContre = true;
            newMaine.flagSurContre = false;
        }
        else {
            newMaine.flagContre = true;
            newMaine.flagSurContre = true;
        }
        partie.historiqueMaine.push(newMaine);
        partie.maine = newMaine;

        savePartie();
        return (partie);
    }

    var avanceEnchere = function (e,c) {

        var newMaine = getNewMaine();

        newMaine.equipeContrat = e;
        newMaine.indiceContrat = partie.maine.indiceContrat+1;
        newMaine.libelleContrat = getContrat(newMaine.indiceContrat).libelle;
        newMaine.couleur=c;

        partie.historiqueMaine.push(newMaine);
        partie.maine = newMaine;
        
        savePartie();
        return (partie);
    }

    var retourEnchere = function () {
        partie.historiqueMaine.splice(partie.historiqueMaine.length - 1, 1);
        partie.maine=partie.historiqueMaine[partie.historiqueMaine.length - 1];
        savePartie();
        return (partie);
    }

    var setWinner = function (e) {

        if (e == Constantes.EQUIPE_A) {
            partie.flagWinnerA = true;
            partie.flagWinnerB = false;
        }

        if (e == Constantes.EQUIPE_B) {
            partie.flagWinnerB = true;
            partie.flagWinnerA = false;
        }

        if (e == Constantes.EQUIPE_INDEFINIE) {
            partie.flagWinnerA = false;
            partie.flagWinnerB = false;
        }

        savePartie();
        return (partie);
    }

    var startPartie = function () {

        partie = persistService.get('Partie');
        if (partie == null) {
            partie = getNewPartie();
        }

        return (partie);
    }

    var startMaine = function () {

        partie.maine = getNewMaine();
        
        partie.historiqueMaine = [];
        partie.historiqueMaine.push(partie.maine);

        savePartie();
        return (partie);
    }

    var getPartie = function () {
        return (partie);
    }

    var setPartie = function (p) {
        partie = p;
        savePartie();
    }

    var getContrat = function (indice) {
        return (tabContrat[indice]);
    }

    var isPartieComplete = function () {
        var ret = false;

        do {
            if (partie.equipeA.joueur1 == Constantes.JOUEUR_NON_RENSEIGNE) break;
            if (partie.equipeA.joueur2 == Constantes.JOUEUR_NON_RENSEIGNE) break;
            if (partie.equipeB.joueur1 == Constantes.JOUEUR_NON_RENSEIGNE) break;
            if (partie.equipeB.joueur2 == Constantes.JOUEUR_NON_RENSEIGNE) break;
            ret = true;
        } while (false);

        return (ret);
    }

    var simulPartie = function () {
        partie.equipeA.score=540;
        partie.equipeA.joueur1='Gilles';
        partie.equipeA.joueur2='Jérome';
        partie.equipeB.score = 1020;
        partie.equipeB.joueur1 = 'Cedric';
        partie.equipeB.joueur2 = 'Christophe';
    }

    startPartie();
    
   // simulPartie();

    return {
        startMaine:startMaine,
        getPartie: getPartie,
        isPartieComplete: isPartieComplete,
        getContrat: getContrat,
        avanceEnchere: avanceEnchere,
        retourEnchere: retourEnchere,
        contre: contre,
        calculMaine: calculMaine,
        annulMaine: annulMaine,
        getLastMaineEquipe: getLastMaineEquipe,
        getDealer: getDealer,
        nextDealer: nextDealer,
        setPartie: setPartie,
        setDealer: setDealer,
        razPartie: razPartie,
        setWinner: setWinner,
        startTime: startTime
    };
});