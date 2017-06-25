# WeatherApp
Node-Angular Application to get weather Report.</br>
Appication running on following link  --> [Heroku](https://enigmatic-brushlands-72289.herokuapp.com) 

## Features </br>
-> User Registration/Login & Authentication with session management using NodeJs.</br>
-> User is automatically logged out after 1 hour of inactivity.</br>
-> HTML Geolocation for getting user's current location.</br>
-> Search and autocomplete city name. Its latitude & longitude is sent for getting exact weather report.</br>
-> Changing wearther report back-ground image based on time (morning,afternoon,night)</br>
-> Storing top 10 Searches history in MongoDb.</br>
-> Search History is specific to a particular user.</br>
-> Use of Search History list to fetch weather report again.</br>
-> Delete the history if not required.</br>

## Third Party APIs </br>
-> Reverse Geolocation G-map API to get address from Latitude & Longitude. </br>
-> Geolocation city prediction API to auto complete relevant city. </br>
-> GeoLocation API to get Latitude & Longitude from address. </br>
-> Openweathermap current weather API to fetch current weather report. </br>

## Third party Directive </br>
-> ngGeolocation directive used to get user's current location.
