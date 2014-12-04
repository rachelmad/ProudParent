'use strict';

/* Controllers */
var proudParentControllerModule = angular.module('proudParentControllerModule', []);

proudParentControllerModule.controller('menuCtrl', ['$scope', '$state', '$rootScope',
    function ($scope, $state, $rootScope) {
        $scope.name = localStorage.getItem("firstName");
        $scope.kidsName = localStorage.getItem("kidName");

        $scope.$goBack = function () {
            window.history.back();
        };
        $scope.state = $state;
    }
    
]);

var MobileServiceClient = WindowsAzure.MobileServiceClient;
var client = new MobileServiceClient('https://proudparent.azure-mobile.net/', 'GNfvCzrtbLcdewuARUUjlKeLCFlWIT39');

var userTable = client.getTable('User');
var childrenTable = client.getTable('Children');
var mediaTable = client.getTable('Media');
var itemsTable = client.getTable('Items');

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

                    var query = childrenTable.where({
                        parentId: localStorage.getItem("userId")
                    }).select('name', 'id')
                    .read().done(function (kidResults) {
                        localStorage.setItem("kidList", JSON.stringify(kidResults));

                        $state.go('ChooseKid');
                    });
                    
                };
            }, function (err) {
                alert("Error: " + err);
            });
        };

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

                        localStorage.setItem("userName", $scope.signUpInfo.uName);
                        localStorage.setItem("firstName", $scope.signUpInfo.fName);
                        localStorage.setItem("lastName", $scope.signUpInfo.lName);
                        
                        localStorage.removeItem("kidList");

                        $state.go('ChooseKid');
                    });

                } else {
                    alert("Sorry. That email is already in use.");
                };
            });
        };
    }
]);

var kidControl = angular.module('kidControl', []);
var kidId;

kidControl.controller('kidCtrl', ['$scope', '$state',
    function ($scope, $state) {
        $scope.addChild = function (childInfo) {
            var newKid = {
                parentId: localStorage.getItem("userId"),
                name: $scope.childInfo.name,
                birthday: $scope.childInfo.bday
            };

            var enterKid = childrenTable.insert(newKid).done(function (inserted) {
                localStorage.setItem("kidId", inserted.id);
            });
            localStorage.setItem("kidName", name);

            $state.go('Home');
        };

        $scope.kids = angular.fromJson(localStorage.getItem("kidList"));

        $scope.getMedia = function (name, id) {
            localStorage.setItem("kidId", id);
            localStorage.setItem("kidName", name);

            var query = mediaTable.where({
                childid: id
            }).select('id', 'name', 'date')
                .orderBy('date')
                .read().done(function (results) {
                    var left = [];
                    var right = [];

                    for (var i = 0; i < results.length; i++) {
                        if (i % 2 == 0) {
                            left.push(results[i]);
                        }
                        else {
                            right.push(results[i]);
                        }
                    }

                    localStorage.setItem("leftMedia", JSON.stringify(left));
                    localStorage.setItem("rightMedia", JSON.stringify(right));

                    $state.go('Home');
                });
        }
    }
]);

var mediaControl = angular.module('mediaControl', []);

mediaControl.controller('mediaCtrl', ['$scope', '$state',
    function ($scope, $state) {
        $scope.left = angular.fromJson(localStorage.getItem("leftMedia"));
        $scope.right = angular.fromJson(localStorage.getItem("rightMedia"));
        $scope.albumName = "";
        $scope.albumDate = "";
        $scope.albumBackground = "";
        $scope.albumId = "";

        $scope.addAlbum = function (album) {
            $scope.albumName = album.name;
            $scope.albumDate = album.date;
            $scope.albumCaption = album.caption;

            alert($scope.albumName);
            $state.go('AddBackground');
        }

        $scope.setBackground = function (bgName) {
            $scope.albumBackground = bgName;

            $state.go("Camera");
            //var newAlbum = {
            //    name: $scope.albumName,
            //    date: $scope.albumDate,
            //    childId: localStorage.getItem("kidId"),
            //    bgImage: $scope.albumBackground,
            //};

            //var enterAlbum = childrenTable.insert(newAlbum).done(function (inserted) {
            //    $scope.albumId = inserted.id;
            //});
            
        }

        $scope.showAlbum = function (id, name, date) {
            localStorage.setItem("albumName", name);
            localStorage.setItem("albumDate", date);

            var query = itemsTable.where({
                albumId: id
            }).select('id', 'picString', 'description')
                .orderBy('pageNumber')
                .read().done(function (results) {
                    localStorage.setItem("albumContent", JSON.stringify(results));
                    
                    $state.go('Album');
                });

        }

        
        //$scope.addMedia = function () {
        //    var today = new Date();
        //    var newAlbum = {
        //        name: "Temp Album",
        //        date: today,
        //        childId: localStorage.getItem("userId")
        //    };
        //    mediaTable.insert(newAlbum).done(function (inserted) {
        //        localStorage.setItem("thisAlbum", inserted);

        //        alert("Inserted!");
        //    });
        //}
    }
]);





