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
                tgSource: '=',
                tgOnSelect: '=',
                tgOnFocus: '=',
                tgOnChange: '=',
                tgMinLength: '='
            },
            controller: ['$scope', function($scope){

            }],
            link: function(scope, elem, attrs){
                elem.autocomplete({
                    source: scope.tgSource,
                    minLength: scope.tgMinLength || 3,
                    select: function(event, selectedItem){
                        event.preventDefault();
                        scope.ngModel = selectedItem.item.label;
                        if(angular.isDefined(scope.tgOnSelect)){
                            if(angular.isFunction(scope.tgOnSelect)){
                                scope.tgOnSelect(selectedItem.item, scope.secondParameter);
                            }
                        }
                        scope.$apply();
                    },
                    focus: function(event, selectedItem){
                        event.preventDefault();
                        scope.ngModel = selectedItem.item.label;
                        if(angular.isDefined(scope.tgOnFocus)){
                            if(angular.isFunction(scope.tgOnFocus)){
                                scope.tgOnFocus(selectedItem.item, scope.secondParameter);
                            }
                        }
                        scope.$apply();
                    },
                    change: function(event, selectedItem){
                        event.preventDefault();
                        if(angular.isDefined(scope.tgChange)){
                            if(angular.isFunction(scope.tgOnChange)){
                                scope.tgOnChange(selectedItem.item, scope.secondParameter);
                            }
                        }
                    },
                })
            }
        }
    }
})();