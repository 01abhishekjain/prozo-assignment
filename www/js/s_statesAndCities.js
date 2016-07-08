//An Util service with methods I will use in different controllers   
MAIN_APP.factory('s_statesAndCities', function () {

    function getStates () {
        return "delhi";
    }

    return {
        getStates: getStates
    };
});   