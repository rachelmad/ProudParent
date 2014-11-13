'use strict';

/* Controllers */
var proudParentControllerModule = angular.module('proudParentControllerModule', []);

proudParentControllerModule.controller('menuCtrl', ['$scope', '$state', '$rootScope',
    function ($scope, $state, $rootScope) {

        $scope.$goBack = function () {
            window.history.back();
        };

    //'menuCtrl', ['$scope', '$state',
    //function ($scope, $state) {
    //    //        console.log("HI");
    //    $scope.$goBack = function () {
    //        window.history.back();
    //    };
    //    $scope.$noRotate = function () {
    //        if (window.innerHeight > window.innerWidth) {
    //            document.getElementsByTagName("body").style.transform = "rotate(90deg)";
    //        }
    //    };
    }]);
