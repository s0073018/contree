angular.module('modController')

.controller('StatController', function ($scope, $rootScope, $location,Constantes, partieService,paramService) {

    $scope.partie = partieService.getPartie();

    $scope.dealer = partieService.getDealer();

    $scope.param = paramService.getParam();

    $scope.C = Constantes;

    $scope.chartType = "bar";
    
    $scope.legendBar = [{
        'bk': 'bkA-gradient',
        'text': $scope.partie.equipeA.joueur1 + " - " + $scope.partie.equipeA.joueur2
    },
    {
        'bk': 'bkB-gradient',
        'text': $scope.partie.equipeB.joueur1 + " - " + $scope.partie.equipeB.joueur2
    }
    ];

    $scope.legendPie = [{
        'color': '#0000DC',
        'text': "Contrat réussi"
    },
    {
        'color': '#FF9651',
        'text': "Chute de l'adversaire"
    },
    {
        'color': '#b6ff00',
        'text': "Reste à faire"
    }
    ];

    $scope.configBar = {
        title: 'Maines de la partie',
        tooltips: false,
        labels: false,
        xAxisMaxTicks:5,
        mouseover: function (d) {
            showInfo(d);
        },
        mouseout: function () {
            hideInfo();
        },
        click: function () { },
        legend: {
            display: false,
            position: 'right'
        },
        innerRadius: 0, // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'traditional' // can be 'lineEnd' or 'traditional'
    }

    $scope.configPieA = {
        title: $scope.partie.equipeA.joueur1 + " - " + $scope.partie.equipeA.joueur2,
        tooltips: false,
        labels: false,
        mouseover: function (d) {
            showInfo(d);
        },
        mouseout: function () {
            hideInfo();
        },
        click: function () { },
        legend: {
            display: false,
            position: 'right'
        },
        innerRadius: '30%', // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'traditional' // can be 'lineEnd' or 'traditional'
    }

    $scope.configPieB = {
        title: $scope.partie.equipeB.joueur1 + " - " + $scope.partie.equipeB.joueur2,
        tooltips: false,
        labels: false,
        mouseover: function (d) {
            showInfo(d);
        },
        mouseout: function () {
            hideInfo();
        },
        click: function () { },
        legend: {
            display: false,
            position: 'right'
        },
        innerRadius: '30%', // applicable on pieCharts, can be a percentage like '50%'
        lineLegend: 'traditional' // can be 'lineEnd' or 'traditional'
    }


   
    $scope.tabData = {
        "series": [$scope.partie.equipeA.joueur1 + "/" + $scope.partie.equipeA.joueur2, $scope.partie.equipeB.joueur1 + "/" + $scope.partie.equipeB.joueur2],
        "data": []
    };

    $scope.tabDataA = {
        "series": [$scope.partie.equipeA.joueur1 + "/" + $scope.partie.equipeA.joueur2],
        "data": []
    };

    $scope.tabDataB = {
        "series": [$scope.partie.equipeB.joueur1 + "/" + $scope.partie.equipeB.joueur2],
        "data": []
    };

    /*

    
    'equipeContrat': Constantes.EQUIPE_INDEFINIE,
            'flagContre': false,
            'flagSurContre': false,
            'succes': false,
            'equipeGagnante': Constantes.EQUIPE_INDEFINIE,
            'points': 0,
            
            */
   function fillDataChart() {
        var d
        var dA
        var dB
        var i;
        var strX;
        var cumulA=0;
        var cumulB = 0;
        var valA = 0;
        var valB = 0;
        var maine;
        var typeA = 0;
        var typeB = 0;

        for (i = 0; i < $scope.partie.historiquePartie.length; i++) {
            strX = (i+1);
            maine=$scope.partie.historiquePartie[i];

            valA = 0;
            valB = 0;
            typeA = 0;
            typeB = 0;

            if (maine.equipeContrat == Constantes.EQUIPE_A) {
                if (maine.succes == true) {
                    cumulA += maine.points;
                    valA = maine.points;
                    typeA = 1;
                    typeB = 0;
                }
                else {
                    cumulB += maine.points;
                    valB = maine.points;
                    typeA = 0;
                    typeB = 2;
                }
            }
            else {
                if (maine.succes == true) {
                    cumulB += maine.points;
                    valB = maine.points;
                    typeA = 0;
                    typeB = 1;
                }
                else {
                    cumulA += maine.points;
                    valA = maine.points;
                    typeA = 2;
                    typeB = 0;
                }
            }
            
            d = {
                "x": strX,
                "y": [
                  cumulA,cumulB,
                ],
                "tooltip": ''
            }
            $scope.tabData.data.push(d);

            dA = {
                "type" : typeA,
                "x": strX,
                "y": [
                  valA,
                ],
                "tooltip": ''
            }
            if (valA > 0) $scope.tabDataA.data.push(dA);

            dB = {
                "type": typeB,
                "x": strX,
                "y": [
                  valB,
                ],
                "tooltip": ''
            }
            if(valB > 0) $scope.tabDataB.data.push(dB);
        }

        dA = {
            "type": 0,
            "x": strX,
            "y": [
              $scope.param.score - cumulA,
            ],
            "tooltip": ''
        }
        if (($scope.param.score - cumulA) > 0) $scope.tabDataA.data.push(dA);

        dB = {
            "type": 0,
            "x": strX,
            "y": [
              $scope.param.score - cumulB,
            ],
            "tooltip": ''
        }
        if (($scope.param.score - cumulB) > 0) $scope.tabDataB.data.push(dB);



   }
    


    fillDataChart();
   
    $scope.retourPartie = function () {
        $location.path('/Partie');
    }

});