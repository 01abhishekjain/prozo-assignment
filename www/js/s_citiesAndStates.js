
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
