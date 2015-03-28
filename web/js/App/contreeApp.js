angular.module('contreeApp', [
    'modController',
    'modService',
    'modDirective',
    'modConstantes',
    'ui.bootstrap',
    'ngRoute',
    'angularCharts'
   
])

.config(
    function ($routeProvider) {
    window.routes = {
        '/Accueil':
        {
            templateUrl: 'partials/accueil.html',
            controller: 'AccueilController',
            aideUrl: 'partials/aide/aide_accueil.html'
        },
        '/Param':
         {
             templateUrl: 'partials/param.html',
             controller: 'ParamController',
             aideUrl: 'partials/aide/aide_param.html'
         },
        '/Enchere':
        {
            templateUrl: 'partials/enchere.html',
            controller: 'EnchereController',
            aideUrl: 'partials/aide/aide_enchere.html',
            flagTempo : true
        },
        '/Partie':
        {
            templateUrl: 'partials/partie.html',
            controller: 'PartieController',
            aideUrl: 'partials/aide/aide_partie.html',
            flagTempo:true
        },
        '/Equipe':
        {
            templateUrl: 'partials/equipe.html',
            controller: 'EquipeController',
            aideUrl: 'partials/aide/aide_equipe.html'
        },
        '/Stat':
        {
            templateUrl: 'partials/stat.html',
            controller: 'StatController',
            aideUrl: 'partials/aide/aide_stat.html',
            flagTempo:true
        }
    };
    for (var path in window.routes) {
        $routeProvider.when(path, window.routes[path]);
    }
    
    $routeProvider.otherwise({ redirectTo: '/Accueil' });
    })


.run(function ($location, $rootScope) {
    $rootScope.$on('$routeChangeStart', function (e, next, current) {

        $rootScope.aideUrl = "";
        $rootScope.flagTempo = false;
        do {
            if (next.aideUrl != undefined) $rootScope.aideUrl = next.aideUrl;
            if (next.flagTempo != undefined) $rootScope.flagTempo = next.flagTempo;
        } while (false);
    });
    
    
});



