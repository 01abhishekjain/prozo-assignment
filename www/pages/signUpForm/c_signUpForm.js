signUpForm.controller("c_signUpForm", function($scope, $ionicPopover, $http, $ionicLoading, $state, s_citiesAndStates) {

    console.log("c_signUp called");

    // adds states to the factory and sets in the controller's scope
    s_citiesAndStates.setStates($scope);
    // starts an interval to check for states every 10 seconds
    var statesInterval = setInterval(function() {
        if (s_citiesAndStates.states.length < 1) {
            s_citiesAndStates.setStates($scope);
        } else {
            clearInterval(statesInterval);
        }
    }, 5000);

    var c_signUpForm = this; // input form
    $scope.user = {}; //holds the user inputs

    $scope.showStatePopover = function($event) {
        $scope.statesPopover = $ionicPopover.fromTemplateUrl('pages/signUpForm/t_statesPopover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.statesPopover = popover;
            $scope.statesPopover.show($event);
        });
    }

    $scope.showCitiesPopover = function($event) {
        $scope.citiesPopover = $ionicPopover.fromTemplateUrl('pages/signUpForm/t_citiesPopover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.citiesPopover = popover;
            $scope.citiesPopover.show($event);
        });
    }

    $scope.setSelectedCity = function(cityName, cityId) {
        c_signUpForm.userProfile.city = cityName;
        $scope.user.city = cityId;
        $scope.citiesPopover.hide();
    }

    $scope.setSelectedState = function(stateName, stateId) {
        c_signUpForm.userProfile.state = stateName;
        $scope.user.state = stateId;
        $scope.statesPopover.hide();

        $scope.setCities(stateId);
        $scope.user.city = null;
        c_signUpForm.userProfile.city = null;
    }

    $scope.setCities = function(stateId) {
        s_citiesAndStates.setCities(stateId, $scope);

        // starts an interval to check for cities every 10 seconds
        var citiesInterval = setInterval(function() {
            if (s_citiesAndStates.cities.length < 1) {
                s_citiesAndStates.setCities(stateId, $scope);
            } else {
                clearInterval(citiesInterval);
            }
        }, 5000);
    }

    $scope.submit = function() {
        var f = c_signUpForm.userProfile;
        // if PAN is dirty then set the form to be true if all other fields are valid and either one of password or pan is valid
        if (f.pan.$dirty && f.email.$valid && f.mobile.$valid && f.nob.$valid && f.pincode.$valid && f.roa.$valid && f.state && f.city) {
            if (c_signUpForm.userProfile.pan.$valid || c_signUpForm.userProfile.password.$valid) {
                f.$valid = true;
                f.$invalid = false;
            }

        }

        if (c_signUpForm.userProfile.$valid) {
            $scope.registerUser($scope.user);
        }
    }

    $scope.registerUser = function(data) {
        $ionicLoading.show();

        var params = {};
        params.apiKey = API_KEY,
            params.candidate_id = "2020",
            params.business_name = data.nob,
            params.email = data.email ? data.email : null, //check optional fields for empty
            params.phone = data.mobile + "",
            params.pan = data.pan ? data.pan : null, //check optional fields for empty
            params.password = data.password,
            params.address = data.roa,
            params.state_id = data.state + "",
            params.city_id = data.city + "",
            params.pincode = data.pincode + "";

        console.log('params ', params);
        var req = {
            method: "POST",
            url: API_SERVER + "users/register-user-demo",
            data: params,
            timeout: 10000
        }

        $http(req).then(success, error);

        function success(res) {
            $ionicLoading.hide();
            if (res.statusText === "OK") {
                if (res.data.status === "success") {
                    // $scope.userId = res.data.user_id;
                    $scope.getUserDetails(res.data.user_id);
                } else if (res.data.status === "fail") {
                    alert(res.error);
                } else {
                    alert(JSON.stringify(res));
                }
                console.log('res ', res);
            } else {
                error(res);
            }
        }

        function error(err) {
            $ionicLoading.hide();
            alert("Please check your network connection.");
        }

    }

    $scope.getUserDetails = function(userId) {
        $ionicLoading.show();

        var req = {
            method: "GET",
            url: API_SERVER + "users/get-user-demo?user_id=" + userId + "&apiKey=" + API_KEY,
            timeout: 10000
        }

        $http(req).then(success, error);

        function success(res) {
            $ionicLoading.hide();
            if (res.statusText === "OK") {
                $state.go("signUpSuccess", { userData: JSON.stringify(res.data.user_data) });
            } else {
                error(res);
            }
        }

        function error(err) {
            $ionicLoading.hide();
            alert("Please check your network connection.");
        }

    }


});
