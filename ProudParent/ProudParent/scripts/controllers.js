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
var childrenTable = client.getTable('Children');

var logControl = angular.module('logControl', []);

logControl.controller('logIn', ['$scope', '$state',
    function ($scope, $state) {
        $scope.authenticate = function (log) {
            var authenticate = userTable.where({
                userName: $scope.log.uName,
                password: $scope.log.pword
            })
            .read().done(function (results) {
                if (JSON.stringify(results) == "[]") {
                    alert("Sorry. Your email or password were incorrect.")
                } else {
                    localStorage.setItem("userId", results[0].id);
                    localStorage.setItem("firstName", results[0].firstName);
                    localStorage.setItem("lastName", results[0].lastName);
                    localStorage.setItem("userName", results[0].userName);

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
            var checkUnique = userTable.where({
                userName: $scope.signUpInfo.uName
            }).read().done(function (results) {
                if (JSON.stringify(results) == "[]") {
                    var newUser = {
                        firstName: $scope.signUpInfo.fName,
                        lastName: $scope.signUpInfo.lName,
                        userName: $scope.signUpInfo.uName,
                        password: $scope.signUpInfo.pword
                    };
                    userTable.insert(newUser).done(function (inserted) {
                        localStorage.setItem("userId", inserted.id);
                    });
                
                    localStorage.setItem("userName", $scope.signUpInfo.uName);  
                    localStorage.setItem("firstName", $scope.signUpInfo.fName);
                    localStorage.setItem("lastName", $scope.signUpInfo.lName);

                    $state.go('ChooseKid');
                } else {
                    alert("Sorry. That email is already in use.");
                };
            });
        };
    }
]);

var addKidControl = angular.module('addKidControl', []);

addKidControl.controller('addKidCtrl', ['$scope', '$state',
    function ($scope, $state) {
        $scope.addChild = function (childInfo) {
            alert("Here");
            alert(localStorage.getItem("userId"));
            var newKid = {
                parentId: localStorage.getItem("userId"),
                name: $scope.childInfo.name,
                birthday: $scope.childInfo.bday
            };

            var enterKid = childrenTable.insert(newKid).done(function (inserted) {
                localStorage.setItem("KidId", inserted.id);

                alert(localStorage.getItem("KidId"));
            });

            $state.go('Home');
        };
    }
]);