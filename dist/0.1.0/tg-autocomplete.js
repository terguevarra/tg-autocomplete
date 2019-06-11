/*! 
 PROJECT: tg-autocomplete 
 VERSION: 0.1.0 
 AUTHOR: Ruther John Guevarra 
 GITHUB: https://github.com/terguevarra/
 LATEST BUILD DATE AND TIME: June 11, 2019 04:57 PM PHILIPPINE TIME*/
(function(){
    'use strict';

    var moduleName = 'tgComponentsAutocomplete';

    var appDependencies = [];

    angular.module(moduleName, appDependencies);
})();
(function(){
    'use strict';

    angular
        .module('tgComponentsAutocomplete')
        .directive('tgAutocomplete', autocomplete);

        autocomplete.$inject = ['$http', '$interpolate', '$parse'];
    function autocomplete($http, $interpolate, $parse){
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                secondParameter: '=?',
                source: '=',
                onSelect: '=',
                onFocus: '=',
                onChange: '=',
                minLength: '='
            },
            controller: ['$scope', function($scope){

            }],
            link: function(scope, elem, attrs){
                elem.autocomplete({
                    source: scope.source,
                    minLength: scope.minLength || 3,
                    select: function(event, selectedItem){
                        event.preventDefault();
                        scope.ngModel = selectedItem.item.label;
                        if(angular.isDefined(scope.onSelect)){
                            if(angular.isFunction(scope.onSelect)){
                                scope.onSelect(selectedItem.item, scope.secondParameter);
                            }
                        }
                        scope.$apply();
                    },
                    focus: function(event, selectedItem){
                        event.preventDefault();
                        scope.ngModel = selectedItem.item.label;
                        if(angular.isDefined(scope.onFocus)){
                            if(angular.isFunction(scope.onFocus)){
                                scope.onFocus(selectedItem.item, scope.secondParameter);
                            }
                        }
                        scope.$apply();
                    },
                    change: function(event, selectedItem){
                        event.preventDefault();
                        if(angular.isDefined(scope.onFocus)){
                            if(angular.isFunction(scope.onFocus)){
                                scope.onFocus(selectedItem.item, scope.secondParameter);
                            }
                        }
                    },
                })
            }
        }
    }
})();