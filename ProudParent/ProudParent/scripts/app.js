'use strict';
    var proudParent = angular.module('proudParent', [
        'ngTouch',
        'proudParentControllerModule',
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
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/logIn.html" },
                    "menu": { templateUrl: "partials/menu.html", controller: "menuCtrl" }
                }
            }).
            state('ChooseKid', {
                url: "",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/selectAKid.html" },
                    "menu": { templateUrl: "partials/menu.html", controller: "menuCtrl" }
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
                    "app": { templateUrl: "partials/takeAPic.html" },
                    "menu": { templateUrl: "partials/menu.html", controller: "menuCtrl" }
                }
            }).
            state('Add', {
                url: "/Add",
                views: {
                    "top": { templateUrl: "partials/topBar.html", controller: "menuCtrl" },
                    "app": { templateUrl: "partials/addAlbum.html" },
                    "menu": { templateUrl: "partials/menu.html", controller: "menuCtrl" }
                }
            });
    });
