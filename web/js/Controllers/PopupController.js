
angular.module('modController')



    .controller('InfoController', function ($scope, $modalInstance, data) {
        $scope.message = data.message.split('\n');
        $scope.titre = data.titre;
        $scope.type = data.type;





        $scope.ok = function () {
            $modalInstance.close();
        };


    })

.controller('AddJoueurController', function ($scope, $timeout,$modalInstance, data, callBack) {

    $scope.joueur = { "nom": "" };

    function setFocus() {
        var tb = $("#nom");
        tb.focus();
    }

    $timeout(setFocus, 300);
    

    $scope.ok = function () {
        callBack($scope.joueur.nom);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };

})

.controller('RazPartieController', function ($scope, $modalInstance, data, callBack) {

    $scope.option = { 'flagJoueur': true };

    $scope.ok = function () {
        callBack($scope.option.flagJoueur);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };

})

    .controller('DelJoueurController', function ($scope, $modalInstance, data, callBack) {

        $scope.nom = data.nom;
        $scope.ok = function () {
            callBack(data);
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.close();
        };

    })

.controller('RazMaineController', function ($scope, $modalInstance, data, callBack) {

    $scope.ok = function () {
        callBack();
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.close();
    };

});




