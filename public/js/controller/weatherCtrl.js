weatherApp.controller('weatherCtrl', function($scope,$rootScope,$timeout,$geolocation,apiFactory, $http,$window,$location,$routeParams) {

        $scope.date=new Date();
        $scope.show_report=false;
        $scope.noSearchTerm=true;
        $scope.weather_loader=false;
       $rootScope.userName=localStorage.userName;
       $rootScope.userId=localStorage.userId;
       // $location.search({})  //clear all parameters at once
       // $scope.lat = undefined;
       //  $scope.lng = undefined;
        
       //  $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
       //      $scope.location = $scope.autocomplete.getPlace().geometry.location;
       //      $scope.lat = $scope.location.lat();
       //      $scope.lng = $scope.location.lng();
       //      console.log($scope.location);
       //      $scope.$apply();
       //  });

       // geolocation directive
    // $scope.coords = geolocation.getLocation().then(function(data){
    //   return {lat:data.coords.latitude, long:data.coords.longitude};
    // });
    // $timeout(function () {
    //               console.log($scope.coords.$$state.value);
    //                   $scope.co_ordinates=$scope.coords.$$state.value;              
    //           },3000);
       $geolocation.getCurrentPosition({
            timeout: 60000
         }).then(function(position) {
            $scope.myPosition = position.coords;
            $scope.myLatitude=$scope.myPosition.latitude;
            $scope.myLongitude=$scope.myPosition.longitude;
            $scope.reverseGeoLocation($scope.myLatitude,$scope.myLongitude);
            console.log($scope.myLatitude);
         });
        $scope.reverseGeoLocation=function(latitude,longitude)
        {
          var config={
                params:{
                  'latitude':latitude,  
                  'longitude':longitude                
                   }
                }
          apiFactory.reverseGeoCoding(config)
          .then(function (response) {
                $scope.myAddress = response.data.results[0].formatted_address;
                console.log($scope.myAddress);
               })
                .catch(function(response) {   
                   if(response.status==403)
                  {
                    console.log("session Expired, Login again");
                    $location.search({});
                    $location.path('/login');
                    delete localStorage.session;
                  }  
                   else if(response.status==404)
                    {
                      $window.alert("Check your Internet Connection/page not found");
                    }
                    else if(response.status==500){
                       $window.alert("Something went wrong!!");
                    }
                  })

        }

        $scope.cityPrediction=function(city){
          $scope.search_loader=true;
          apiFactory.getCityPredictions(city)
          .then(function (response) {
          $scope.search_loader=false;
          $scope.predictedCities = response.data.predictions; 
          })
          .catch(function(response) { 
             if(response.status==403)
              {
                console.log("session Expired, Login again");
                $location.search({});
                $location.path('/login');
                delete localStorage.session;
              }    
              if(response.status==404)
              {
                $window.alert("Check your Internet Connection/page not found");
              }
              else if(response.status==500){
                 $window.alert("Something went wrong!!");
              }
            })
         }
       
          $scope.cityLatLong=function(city){
          $scope.fullAddress=city;
          $scope.city=""; //for clearing modal input after data dismiss
          // /$scope.city = city.substring(0,city.indexOf(','));
          console.log($scope.city);
          apiFactory.getCityLatLong($scope.fullAddress)
          .then(function (response) {
          $scope.latitude = response.data.results[0].geometry.location.lat;
          $scope.longitude = response.data.results[0].geometry.location.lng; 
          $scope.weather_loader=true;
          $scope.show_report=false;
          $scope.weatherReport($scope.latitude,$scope.longitude,$scope.fullAddress);
          $scope.searchHistoryAdd($scope.latitude,$scope.longitude,$scope.fullAddress)
          })
          .catch(function(response) {  
              if(response.status==403)
              {
                console.log("session Expired, Login again");
                $location.search({});
                $location.path('/login');
                delete localStorage.session;
              }  
              else if(response.status==404)
              {
                $window.alert("Check your Internet Connection/page not found");
              }
              else if(response.status==500){
                 $window.alert("Something went wrong!!");
              }
            })
         }
            
            $scope.weatherReport=function(latitude,longitude,city)
            {

              $scope.weather_loader=true;
              $scope.fullAddress=city
              var config={
                params:{
                  'latitude':latitude,  
                  'longitude':longitude                
                   }
                }
                apiFactory.getWeatherReport(config)
                .then(function (response) {
                  $scope.weatherData = response.data;
                  $scope.weather = $scope.weatherData.weather[0];
                  $scope.iconCode=$scope.weather.icon;
                  $scope.iconUrl="http://openweathermap.org/img/w/" + $scope.iconCode + ".png";
                  $scope.main=$scope.weatherData.main;
                  $scope.clouds=$scope.weatherData.clouds;
                  $scope.visibility=$scope.weatherData.visibility;
                  $scope.wind=$scope.weatherData.wind;
                  $scope.sys=$scope.weatherData.sys;
                  $scope.weather_loader=false;
                  $scope.show_report=true;

                  })
                  .catch(function(response) {
                     if(response.status==403)
                    {
                      console.log("session Expired, Login again");
                      $location.search({});
                      $location.path('/login');
                      delete localStorage.session;
                    }     
                    else if(response.status==404)
                      {
                        $window.alert("Check your Internet Connection/page not found");
                      }
                      else if(response.status==500){
                         $window.alert("Something went wrong!!");
                      }
                    })     

            }
            $scope.searchHistoryAdd=function(latitude,longitude,city)
            {
              var data={
                latitude:latitude,
                longitude:longitude,
                city:city,
                userId:localStorage.userId
              }
              apiFactory.addSearchtoHistoryList(data)
              .then(function (response) {
                $scope.data = response.data;
                console.log($scope.data);
               })
                .catch(function(response) {   
                   if(response.status==403)
                  {
                    console.log("session Expired, Login again");
                    $location.search({});
                    $location.path('/login');
                    delete localStorage.session;
                  }  
                   else if(response.status==404)
                    {
                      $window.alert("Check your Internet Connection/page not found");
                    }
                    else if(response.status==500){
                       $window.alert("Something went wrong!!");
                    }
                  })

              $scope.searchHistoryGet();
            }
            $scope.searchHistoryGet=function()
            {
              var config={
                params:{
                  'userId':localStorage.userId,                 
                   }
                }
              apiFactory.getSearchtoHistoryList(config)
              .then(function (response) {
                // var string="nagpur,maharashtra,india";
                // var first = string.indexOf(",");
                // var second = string.indexOf(",", first + 1);
                // console.log(first);
                $scope.SearchHistoryList = response.data;
               })
                .catch(function(response) { 
                 if(response.status==403)
                  {
                    console.log("session Expired, Login again");
                    $location.search({});
                    $location.path('/login');
                    delete localStorage.session;
                  }  
                   else if(response.status==404)
                    {
                      $window.alert("Check your Internet Connection/page not found");
                    }
                    else if(response.status==500){
                       $window.alert("Something went wrong!!");
                    }
                  })
            }
            $scope.searchHistoryGet();

            $scope.searchHistoryDelete=function(id)
            {
              apiFactory.deleteSearchtoHistoryList(id)
              .then(function (response) {
               $scope.deleteResponse = response.data;
               $scope.searchHistoryGet();
               })
                .catch(function(response) { 
                 if(response.status==403)
                  {
                    console.log("session Expired, Login again");
                    $location.search({});
                    $location.path('/login');
                    delete localStorage.session;
                  }  
                   else if(response.status==404)
                    {
                      $window.alert("Check your Internet Connection/page not found");
                    }
                    else if(response.status==500){
                       $window.alert("Something went wrong!!");
                    }
                  })
            }



  });
