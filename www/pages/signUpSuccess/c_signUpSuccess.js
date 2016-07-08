signUpSuccess.controller("c_signUpSuccess", function($scope, $state, s_citiesAndStates, $ionicHistory) {

    $scope.userData = JSON.parse($state.params.userData);

    var states = s_citiesAndStates.states;
    for (var i = 0; i < states.length; i++) {
        if (states[i].id == $scope.userData.state_id) $scope.userData.state_name = states[i].name;
    }
    var cities = s_citiesAndStates.cities;
    for (var i = 0; i < cities.length; i++) {
        if (cities[i].id == $scope.userData.city_id) $scope.userData.city_name = cities[i].name;
    }

    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();

});
