angular.module('modController')

.controller('MainController', function ($scope, Constantes, $rootScope, $window, toolsService, $modal,paramService, partieService) {
    $scope.flagAide = false;
    $scope.scoreTempoUrl = "partials/scoreTempo.html";
    $scope.param = paramService.getParam();

    $scope.showScoreTempo = function (flag) {
        if (flag == true) {
            if ($rootScope.flagTempo == false) return;
            var hstart = partieService.getPartie().heureStart;
            if (hstart == 0) return;
            var partie = partieService.getPartie();
            if ((partie.equipeA.score <= 0) && (partie.equipeB.score <= 0)) return;
            $(".panel-score-tempo").css("opacity", "1");
            $(".panel-score-tempo").css("bottom", "0vh");
            $(".panel-score-tempo").css("right", "0vw");
        }
        else {
            $(".panel-score-tempo").css("opacity", "0");
            $(".panel-score-tempo").css("bottom", "100vh");
            $(".panel-score-tempo").css("right", "100vw");
        }
    }

    $scope.aide = function () {
        if ($scope.flagAide == false) {
            $scope.flagAide = true;
            $(".panel-aide").css("opacity", "1");
            $(".panel-aide").css("bottom", "1vh");
            $(".panel-aide").css("right", "1vw");
        }
        else {
            $(".panel-aide").css("opacity", "0");
            $scope.flagAide = false;
            $(".panel-aide").css("bottom", "95vh");
            $(".panel-aide").css("right", "95vw");
        }
    }

    $rootScope.DlgInfoShow = function (titre, mes, type) {
        
        var d = {
            'titre' : titre,
            'message': mes,
            'type':type
        }
        var modalInstance = $modal.open(
            {
                templateUrl: 'js/Popup/Templates/popup_Info.html',
                controller: 'InfoController',
                resolve: {
                    data: function () {
                        return d;
                    }
                }

            });
    }

    $rootScope.DlgShow = function (template, controller, d, cb, cs) {

        var csName = "";
        if (cs != undefined) csName = cs;

        var modalInstance = $modal.open(
            {
                templateUrl: 'js/Popup/Templates/' + template,
                controller: controller,
                windowClass: csName,
                resolve: {
                    callBack: function () {
                        return cb;
                    },
                    data: function () {
                        return d;
                    }
                }

            });
    }

    $('.auto-close').click(function () {
        if ($rootScope.isMobile() == true) {
            $(".navbar-collapse").collapse('hide');
        }
    });

    $(function() {
        $.idleTimer($scope.param.delai*1000);
    });

    $(document).on("idle.idleTimer", function (event, elem, obj) {
        $scope.showScoreTempo(true);
    });

    $(document).on("active.idleTimer", function (event, elem, obj, triggerevent) {
        $scope.showScoreTempo(false)
    });

    
});