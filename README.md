# WeatherApp
To get weather Report based on google maps parameters

## Features
-> ### User Authentication with session management. User is automatically logged out after 1 hour of inactivity.
-> ### HTML Geolocation for getting user's current location.
-> ### Search and autocomplete city name. Its latitude & longitude is sent for getting exact weather report.
-> ### Storing top 10 Searches history in MongoDb.
-> ### Search History is specific to a particular user.
-> ### Use of Search History list to fetch weather report again.
-> ### Delete the history if not required.

## Third Party APIs
-> Reverse Geolocation G-map API to get address from Latitude & Longitude
-> Geolocation city prediction API
-> GeoLocation API to get Latitude & Longitude from address.
-> Openweathermap current weather API to fetch current weather report.

## Third party Directive
-> ngGeolocation directive used to get user's current location.
