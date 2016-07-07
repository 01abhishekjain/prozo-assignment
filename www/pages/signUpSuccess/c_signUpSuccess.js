MAIN_APP.controller("c_signUpSuccess", function($scope, $state) {

    console.log("c_signUpSuccess called");

    $scope.userData = JSON.parse($state.params.userData);

    // var params = { "status": "success", "user_data": { "id": 26, "business_name": "sdv", "email": "svwsf@erwv", "phone": "2222222222", "pan": "NA", "address": "sv", "state_id": 18, "city_id": 309, "pincode": "323232" } }

    // $scope.userData = params.user_data;

});