angular.module('modService')

.factory('paramService', function ($http,persistService) {
    
    var paramDefault = {
        'delai': 60,
        'email': 'jerome.aluffi@it-ce.fr',
        'score': 1500,
        'rotate' : true
    }

        var getParam = function () {
            var p = persistService.get('param-contree');
            if(p == null) p=paramDefault;
            return (p);
        };

         var setParam = function (p) {

             persistService.set('param-contree',p);
         };

        return {
            getParam: getParam,
            setParam:setParam
        };
});