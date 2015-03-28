angular.module('modDirective')

.directive('joueur', function (joueurService, $timeout,Constantes) {
    return {
        controller: function ($scope) {

            

            
        },
        link: function (scope, element, attrs) {
            
            function setVal() {
                if (scope._j == "") {
                    scope.nomStatic = Constantes.JOUEUR_NON_RENSEIGNE;
                }
                else {
                    scope.nomStatic = scope._j;
                }
            }

            scope.notif =function(){
                if (scope._func != undefined) {
                    scope._func();
                }
            }


            scope.$watch('_j', function (newValue, OldValue) {
                setVal();
            }, true);

            setVal();
        },
        restrict: 'E',
        scope: {
            _j: '=nom',
            _func: '&onSelect',
        },
       
        templateUrl: 'js/Directives/templates/template_joueur.html'
    }
});