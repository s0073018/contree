angular.module('modService')

.factory('toolsService', function ($http,$window,paramService) {
        
    var dateToWcf = function (d) {
        if (isNaN(d)) return null;
        return '\/Date(' + d.getTime() + '-0000)\/';
    }

    var convertToDate = function (str) {

        var d = new Date();
        d.setDate(1);

        var tmp = str.substr(0, 4);
        d.setYear(tmp);

        tmp = str.substr(5, 2);
       
        d.setMonth(parseInt(tmp) - 1);

        tmp = str.substr(8, 2);
        d.setDate(tmp);

        tmp = str.substr(11, 2);
        d.setHours(tmp);

        tmp = str.substr(14, 2);
        d.setMinutes(tmp);
        return (d);
    }

    var isToday = function (str) {
        var ret = false;
        var d = convertToDate(str);
        var dToday = new Date();
        if (d.getDate() == dToday.getDate() && d.getMonth() == dToday.getMonth() && d.getFullYear() == dToday.getFullYear()) {
            ret = true;
        }

        return (ret);
    }

    var sendMailVainqueur=function (p){

        var param = paramService.getParam();
        if (param.email == "") return;

        var dest = param.email;
        var subject = "Résultat contrée";
        var body = "Le " + getStrDateHeureNow();
        body = body + "\n\nEquipe A : " + p.equipeA.joueur1 + ' - ' + p.equipeA.joueur2
        body = body + "\nEquipe B : " + p.equipeB.joueur1 + ' - ' + p.equipeB.joueur2
        if (p.flagWinnerA == true) {
            body = body + "\n\nGAGNANT :  EQUIPE A ";
            body = body + "\nScore : " + p.equipeA.score + " pts   -   " + p.equipeB.score + " pts";
        }
        else {
            body = body + "\n\nGAGNANT :  EQUIPE B ";
            body = body + "\nScore : " + p.equipeB.score + " pts   -   " + p.equipeA.score + " pts";
        }
            
       
        var mailto_link = 'mailto:' + dest + '?subject=' + subject + '&body=' + encodeURIComponent(body)

       
        $window.location = mailto_link;
      
    }
    var isTomorow = function (str) {
        var ret = false;
        var d = convertToDate(str);
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (d.getDate() == tomorrow.getDate() && d.getMonth() == tomorrow.getMonth() && d.getFullYear() == tomorrow.getFullYear()) {
            ret = true;
        }

        return (ret);
    }

    var getTimeStamp = function (str) {

        var d = convertToDate(str);
        
        return(d.getTime());
    };

    var getStrDateHeure = function (str) {

        var d = convertToDate(str);
        
        var mois = FormatMonth(d);
        var ret = "";

        if (isToday(str) == true) {
            ret = "Aujourd'hui";
        }
        else {
            if (isTomorow(str) == true) {
                ret = "Demain";
            }
            else {
                ret = "Le " + d.getDate() + "/" + mois;
            }
        }
        ret = ret + " à " + d.getHours() + "h";
        if (d.getMinutes() < 10) ret = ret + "0";
        ret = ret + d.getMinutes();
        return (ret);
    };

    var getStrDateHeureNow = function () {

        var d = new Date();
        
        var mois = FormatMonth(d);

        var ret = "";
        if (d.getDate() < 10) ret = "0";
        ret = ret + d.getDate() + "/" + mois;

        ret = ret + " a " + d.getHours() + "h";
        if (d.getMinutes() < 10) ret = ret + "0";
        ret = ret + d.getMinutes();
        return (ret);
    };

    var getStrDate = function (str) {

        var d = convertToDate(str);
        
        var mois = FormatMonth(d);

        var ret = d.getDate() + "/" + mois;

        return (ret);
    };

    var getStrHeure = function (str) {

        var d = convertToDate(str);
        var ret = d.getHours() + "h";
        if (d.getMinutes() < 10) ret = ret + "0";
        ret = ret + d.getMinutes();
        return (ret);
    };

    function FormatMonth(d) {
        var val = d.getMonth() + 1;
        var mois = "";
        if (val < 10) mois = "0";
        mois = mois + val;
       
        return (mois);
    }

    var getStrEcart = function (d) {
        var today = new Date();

        var diff = dateDiff(today, d);
        if (diff == null) {
            return "";
        }
        else {
            var info = "";
            if (diff.day > 0) info = info + diff.day + " jour";
            if (diff.day > 1) info = info + 's';

            if (diff.hour > 0) info = info + " " + diff.hour + " heure";
            if (diff.houre > 1) info = info + 's';

            if (diff.min > 0) info = info + " " + diff.min + " mn";
            if (diff.min > 1) info = info + 's';

            return (info);
        }
    }
        /* Private */
    
    var formatNom =function(nom){
        var ret = nom.substr(0, 1).toUpperCase();
        ret=ret + nom.substring(1).toLowerCase();
        return (ret);
    }

    function dateDiff(date1, date2) {
            var diff = {}                           // Initialisation du retour
            var tmp = date2.getTime() - date1.getTime();
            if (tmp < 0) return (null);

            tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
            diff.sec = tmp % 60;                    // Extraction du nombre de secondes

            tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
            diff.min = tmp % 60;                    // Extraction du nombre de minutes

            tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
            diff.hour = tmp % 24;                   // Extraction du nombre d'heures

            tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
            diff.day = tmp;

            return diff;
        }

    var endWith = function (str, key) {
        return (str.substring(str.length - key.length, key.length) == key);
    }
        return {
           getStrDateHeure: getStrDateHeure,
            getStrHeure: getStrHeure,
            getStrDate: getStrDate,
            getStrEcart :getStrEcart,
            getTimeStamp:getTimeStamp,
            convertToDate: convertToDate,
            isTomorow: isTomorow,
            isToday: isToday,
            dateToWcf: dateToWcf,
            formatNom: formatNom,
            sendMailVainqueur: sendMailVainqueur,
            endWith: endWith
        };
});