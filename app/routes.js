// app/routes.js

// load the todo model
var mongoose=require('mongoose');
var Profile=require('./models/user');
var SearchHistory=require('./models/searchHistory');
var jwt    = require('jsonwebtoken');
var session = require('express-session');
const ObjectId = mongoose.Types.ObjectId;

// expose the routes to our app with module.exports
module.exports = function(app) {

    // api ---------------------------------------------------------------------
    
    app.get('/searchhistory',auth,function(req,res){
         var query={
                    'userId': req.query.userId 
                   }
        SearchHistory.find(query)
        .limit(10)
        .sort([[ 'created_at', 'descending']])
        .exec(function(err, data) {
            if (err)
                res.send(err)
            res.json(data);
            
        });

    });
      
    //Add History with particular useId
    
    app.post('/searchhistory/add',auth, function(req, res) {

        SearchHistory.create({
            latitude : req.body.latitude,
            longitude : req.body.longitude,
            city:req.body.city,
            userId: req.body.userId
          }, function(err, historydata) {
            if (err)
                res.send(err);
            res.json(historydata);
            console.log(historydata);
        });    

    });
      //Delete history
    app.delete('/searchhistory/delete/:id',auth,function(req,res){

         SearchHistory.remove({
            _id : req.params.id
        }, function(err, data) {
            if (err)
                res.send(err);
            res.json(data);
             
        });
    }); 


    //Register User
    app.post('/register', function(req, res) {

        
        Profile.findOne({email: req.body.email}, function(err, user) {

         if (err) throw err;

         if (user) {
            res.status(409).json({ success: false, message: 'Email already taken'});
         } 
         else
         {

            Profile.create({
                username : req.body.username,
                password:req.body.password,
                email:req.body.email,
                done : true
              }, function(err, userDetails) {
                  if (err) { 
                    // if(err.code==11000)
                    //     return res.status(409).json({ success: false, message: 'username or email already taken'})
                    // else {
                     return res.status(401).send(err);
                     // }
                  }
                  else
                    return res.json(userDetails);

            }); 
          }
      })   

    });

     

    

    //authenticate
    app.post('/authenticate', function(req, res) {

    // find the user
        Profile.findOne({
            username: req.body.username
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.status(410).json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.body.password) {
                    res.status(411).json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    // var token = jwt.sign(user, 'superSecret', {
                    //     expiresIn: 86400 // expires in 24 hours
                    // });

                    req.session.user = req.body.username;
                    req.session.admin = true;
                    //res.send("login success!");

                    res.json({
                        success: true,
                        message: 'Enjoy your session!',
                        session: req.session.user,
                        data:{"username":user.username,"password":user.password,"email":user.email,"_id":user._id,"userId":user.userId}
                    });
                }       

            }

          });
    });
    app.get('/logout', function (req, res) {
      req.session.destroy();
      res.send("logout success!");
    });
    app.get('/verify',auth,function(req,res){
        
        res.json({islogin:true});
    })
    app.get('/content',auth, function (req, res) {
        res.send("You can only see this after you've logged in.");
    });

   //  function auth(req, res, next) {

   //      // check header or url parameters or post parameters for token
   //      var token = req.body.token || req.param('token') || req.headers['x-access-token'];

   //      // decode token
   //      if (token) {

   //          // verifies secret and checks exp
   //          jwt.verify(token, 'superSecret', function(err, decoded) {          
   //              if (err) {
   //                  return res.json({ success: false, message: 'Failed to authenticate token.' });      
   //              } else {
   //                  // if everything is good, save to request for use in other routes
   //                  req.decoded = decoded;  
   //                  next();
   //              }
   //          });

   //      } else {

   //          // if there is no token
   //          // return an error
   //          return res.status(403).send({ 
   //              success: false, 
   //              message: 'No token provided.'
   //          });
            
   //      }
        
   // };

   function auth(req, res, next) {
         var sessionValue = req.body.token || req.param('token') || req.headers['token'];
         if (req.session && req.session.user === sessionValue && req.session.admin)
            return next();
         else {
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.'
            });
            
        }
    };


  


  

};