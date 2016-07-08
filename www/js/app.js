// Prozo ASSIGNMENT
// by: Abhishek Jain
// 01abhishekjain@gmail.com

// global vars
var API_SERVER = "http://stagingbiz.prozo.in/api/web/assignment/";
var API_KEY = "45c40d5069839657a63c0ffaa69c605b";

// modules
var signUpForm = angular.module('signUpForm', []);
var signUpSuccess = angular.module('signUpSuccess', []);

var MAIN_APP = angular.module('prozoTest', ['ionic', 'signUpForm', 'signUpSuccess']);

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

// state config
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


//factories and services
MAIN_APP.factory('s_citiesAndStates', function($http, $ionicLoading) {


    var states = {
        states: [],
        cities: []
    };

    states.setStates = function(scope) {
        var req = {
            method: "GET",
            url: API_SERVER + "states/1",
            timeout: 10000
        }

        $http(req).then(success, error);

        function success(res) {
            if (res.statusText === "OK") {
                states.states = res.data; //add to factory
                scope.states = states.states; //add to scope
            }
        }

        function error(err) {
            alert("Couldn't load states. Please check your network connection.");
        }
    };

    states.setCities = function(stateId, scope) {
        $ionicLoading.show()

        //clear the current cities
        states.cities = [];
        scope.cities = [];

        var req = {
            method: "GET",
            url: API_SERVER + "cities/" + stateId,
            timeout: 10000
        }

        $http(req).then(success, error);

        function success(res) {
            $ionicLoading.hide();
            if (res.statusText === "OK") {
                states.cities = res.data; //add to factory
                scope.cities = states.cities; //add to scope
            }
        }

        function error(err) {
            $ionicLoading.hide();
            alert("Couldn't load cities. Please check your network connection.");
        }
    };

    return states;
});
