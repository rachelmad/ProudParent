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
    }
    
]);

var MobileServiceClient = WindowsAzure.MobileServiceClient;
var client = new MobileServiceClient('https://proudparent.azure-mobile.net/', 'GNfvCzrtbLcdewuARUUjlKeLCFlWIT39');

var userTable = client.getTable('User');

var logControl = angular.module('logControl', []);

logControl.controller('logIn', ['$scope', '$state',
    function ($scope, $state) {
        $scope.authenticate = function (log) {
            var authenticate = userTable.where({
                userName: $scope.log.uName,
                password: $scope.log.pword
            }).select('firstName')
            .read().done(function (results) {
                if (JSON.stringify(results) == "[]") {
                    alert("Sorry. Your email or password were incorrect.")
                } else {
                    alert(JSON.stringify(results));

                    $state.go('ChooseKid');
                };
            }, function (err) {
                alert("Error: " + err);
            });

        };

        
    }
]);

var registerControl = angular.module('registerControl', []);

registerControl.controller('signUpCtrl', ['$scope', '$state',
    function ($scope, $state) {
        $scope.addUser = function (signUpInfo) {
            alert("Here");
            var checkUnique = userTable.where({
                userName: $scope.signUpInfo.uName
            }).read().done(function (results) {
                if (JSON.stringify(results) == "[]") {
                    userTable.insert({
                        firstName: $scope.signUpInfo.fName,
                        lastName: $scope.signUpInfo.lName,
                        userName: $scope.signUpInfo.uName,
                        password: $scope.signUpInfo.pword
                    })

                    $state.go('ChooseKid');
                } else {
                    alert("Sorry. That email is already in use.");
                };
            });
        };
    }
]);