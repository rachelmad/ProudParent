'use strict';
    var proudParent = angular.module('proudParent', [
        'ngTouch',
        'proudParentControllerModule',
        'logControl', //'registerControl',
        'kidControl', 'mediaControl', //'listKidsControl', 
        'ui.router',
        'ui.bootstrap'
        //'restangular',
    ]);

    
    proudParent.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(""),

        $stateProvider.
            state('Default', {
                url: "",
                views: {
                    "app": { templateUrl: "partials/logIn.html", controller: "logIn" }
                }
            }).
            state('ChooseKid', {
                url: "/ChooseKid",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/selectAKid.html" }
                }
            }).
            state('Home', {
                url: "/Home",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/kidTree.html" },
                    "menu": { templateUrl: "partials/menu.html", controller: "menuCtrl" }
                }
            }).
            state('Share', {
                url: "/Share",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/share.html" },
                    "menu": { templateUrl: "partials/menu.html", controller: "menuCtrl" }
                }
            }).
            state('Album', {
                url: "/Album",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/album.html" },
                    "menu": { templateUrl: "partials/menu.html", controller: "menuCtrl" }
                }
            }).
            state('Camera', {
                url: "/Camera",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/takeAPic.html" }
                }
            }).
            state('Add', {
                url: "/Add",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/addAlbum.html" },
                }
            }).
            state('SignUp', {
                url: "/SignUp",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/signUp.html" },
                }
            }).
            state('AddKid', {
                url: "/AddKid",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/addKid.html"/*, controller: "kidCtrl" */},
                }
            }).
        state('AddBackground', {
                url: "/AddBackground",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/addbackground.html" }
                }
            });
    });
