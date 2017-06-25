var request = require('request');

exports.getCityPredictions = function(req,res){
console.log(req.params.city);
req.pipe(request({
    url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+req.params.city+'&types=(cities)&key=AIzaSyB6ky0s6kmaxH15hsxsNHKuZeI6n_OG2eA',
    method: req.method,
    json: true
  })).pipe(res);

}
exports.getCityLatLong = function(req,res){
console.log(req.params.city);
req.pipe(request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address='+req.params.city,
    method: req.method,
    json: true
  })).pipe(res);
}

exports.getWeatherReport = function(req,res){
console.log(req.query.longitude);
console.log(req.query.latitude);
req.pipe(request({
	qs:{lat:req.query.latitude,lon:req.query.longitude,APPID:'61675b5c6ab3c1cc1003df821db4ba78',units:'metrics'},
    url: 'http://api.openweathermap.org/data/2.5/weather',
    method: req.method,
    json: true
  })).pipe(res);
}
//reverse geolocation through lat long
exports.reverseGeoCoding = function(req,res){
console.log(req.query.longitude);
console.log(req.query.latitude);
req.pipe(request({
	url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+req.query.latitude+','+req.query.longitude+'&key=AIzaSyB6ky0s6kmaxH15hsxsNHKuZeI6n_OG2eA',
    method: req.method,
    json: true
  })).pipe(res);
}
//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
//http://api.openweathermap.org/data/2.5/forecast/daily?q=London&units=metric&cnt=7&APPID=61675b5c6ab3c1cc1003df821db4ba78
//http://api.apixu.com/v1/forecast.json?key=670109f3395349e8ac9192003172206&q=