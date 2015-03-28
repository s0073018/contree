angular.module('modDirective')

.directive('check', function ($timeout) {
    return {
        controller: function ($scope) {

        },
        link: function (scope, element, attrs) {
            scope.setIcon = function () {
                var div = jQuery(element);


                var img = jQuery(element).find("i");
                if (scope._d == true) {
                    div.removeClass().addClass("divCheckOn checkboxButton");

                    if (scope._iconCheck != undefined) img.removeClass().addClass("glyphicon " + scope._iconCheck);
                    else img.removeClass().addClass("glyphicon glyphicon-check");
                }
                else {
                    div.removeClass().addClass("divCheckOff checkboxButton");

                    if (scope._iconUncheck != undefined) img.removeClass().addClass("glyphicon " + scope._iconUncheck);
                    img.removeClass().addClass("glyphicon glyphicon-unchecked");
                }
                if (scope._cssC != undefined) img.addClass(scope._cssC);
                if (scope._pos != undefined) {
                    if (scope._pos == 'right') img.addClass("pull-right");
                }
                /*if (scope._disable == true) {
                    img.css('color', '#DDDDDD');
                    img.css('cursor', 'not-allowed');
                }
                else {
                    img.css('color', '#428BCA');
                    img.css('cursor', 'pointer');
                }*/
            }

            scope.setText = function () {
                var txt = jQuery(element).find("span");
                if (scope._t != undefined) txt.text(scope._t);
                if (scope._cssT != undefined) txt.addClass(scope._cssT);

                /*if (scope._disable == true) {
                    txt.css('color', '#DDDDDD');
                    txt.css('cursor', 'not-allowed');
                }
                else {
                    txt.css('color', '#428BCA');
                    txt.css('cursor', 'pointer');
                }*/
            }

            scope.change = function () {
                if (scope._disable != true) {
                    scope._d = !scope._d;
                    scope.setIcon();
                }
            }

            scope.setIcon();
            scope.setText();

            

            scope.$watch('_d', function (newValue, OldValue) {
                if (newValue != OldValue) {
                    //.log("watch : new :" + newValue + "  old :" + OldValue);

                    scope.setIcon();
                    if (scope._notif != null) {
                        scope._notif();
                    }
                }
            }, true);

            scope.$watch('_disable', function (newValue, OldValue) {
                scope.setIcon();
                scope.setText();

            }, true);
        },
        restrict: 'E',
        scope: {
            _d: '=val',
            _t: '@texte',
            _cssC: '@cssCheck',
            _cssT: '@cssTexte',
            _pos: '@position',
            _iconCheck: '@iconCheck',
            _iconUncheck: '@iconUncheck',
            _notif: '=onChange',
            _disable : '=disable'
        },
        replace: 'true',
        template: '<div class="divCheck"  style="cursor:pointer;"><button type="button" class="checkboxButton" ng-click="change()" auto-scroll><i></i></button><span style="padding-left:5px;padding-right:5px;" ng-click="change()"></span></div>'
    }
});