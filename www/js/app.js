// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var MAIN_APP = angular.module('prozoTest', ['ionic']);
var API_SERVER = "http://stagingbiz.prozo.in/api/web/assignment/";
var API_KEY = "45c40d5069839657a63c0ffaa69c605b";

MAIN_APP.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})


MAIN_APP.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("signUpForm", {
            url: "/",
            templateUrl: "pages/signUpForm/t_signUpForm.html",
            controller: "c_signUpForm as c_signUpForm"
        })
        .state("signUpSuccess", {
            url: "signUpSuccess/:userData",
            templateUrl: "pages/signUpSuccess/t_signUpSuccess.html",
            controller: "c_signUpSuccess"
        });

    $urlRouterProvider.otherwise("/");

});
