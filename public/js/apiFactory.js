angular.module('weatherApp')
    .factory('apiFactory', function($http) {

    var apiFactory = {};

    apiFactory.registerUser=function(data)
    {
        return $http.post('/register',data);
    }
   
    apiFactory.userLogin = function (data) {
        return $http.post('/authenticate',data);
    };
    apiFactory.logout=function()
    {
        return $http.get('/logout');
    }

    apiFactory.getCityPredictions=function(city)
    {
        return $http.get('/getCityPredictions/'+city);
    }

    apiFactory.getCityLatLong=function(city)
    {
        return $http.get('/getCityLatLong/'+city);
    } 
    apiFactory.reverseGeoCoding=function(config)
    {
        return $http.get('/reverseGeoCoding',config);
    }
    apiFactory.getWeatherReport=function(config)
    {
        return $http.get('/getWeatherReport',config);
    }

     apiFactory.addSearchtoHistoryList=function(data)
    {
        return $http.post('/searchhistory/add',data);
    }
    apiFactory.getSearchtoHistoryList=function(config)
    {
        return $http.get('/searchhistory',config);
    }
    apiFactory.deleteSearchtoHistoryList=function(id)
    {
        return $http.delete('/searchhistory/delete/'+id);
    }
    apiFactory.getLocationTime=function(config)
    {
        return $http.get('/getLocationTime',config);
    }
    
    return apiFactory;
});
