    var express  = require('express');
    var app      = express();                        // create our app w/ express
    var mongoose = require('mongoose');              // mongoose for mongodb
    var crypto = require('crypto'); 
    var bcrypt = require('bcrypt');     //password hash
    var morgan   = require('morgan');                // log requests to the console (express4)
    var api=require('./routes/api');
    var bodyParser = require('body-parser'); 
    var textSearch = require('mongoose-text-search'); 
    var jwt    = require('jsonwebtoken');    
    var port     = process.env.PORT || 8888;         // set the port
    var session = require('express-session');
    app.use(session({
        secret: '2C44-4D44-WppQ38S',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60000*60 },  //60 min
        rolling: true   //will refresh expiration period back to maxAge :D
    }));

    // configuration ===============================================================
    mongoose.connect('mongodb://heroku_wzx292v1:ov4ufiasdkmta14k26g2jl3i9a@ds129010.mlab.com:29010/heroku_wzx292v1');     // connect to mongoDB database on modulus.io - heroku
    //mongoose.connect('mongodb://localhost/WeatherApp');//local mongoDB
    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    
    app.get('/getCityPredictions/:city', api.getCityPredictions);
    app.get('/getCityLatLong/:city', api.getCityLatLong);
    app.get('/getWeatherReport', api.getWeatherReport);
    app.get('/reverseGeoCoding', api.reverseGeoCoding);
    app.get('/getLocationTime', api.getLocationTime);
    // routes ======================================================================
    require('./app/routes.js')(app);

    app.get('/*', function(req, res){
        res.sendfile(__dirname + '/public/index.html');
    });

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);
