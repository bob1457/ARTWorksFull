var mongooose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    request = require('request'),
    //path = require('path'),
    //multer = require('multer'),
    FbUser = require('../models/facebook.user'),
    passport = require('../config/passport');


exports.facebook = function(req, res, next) {
    console.log('face book api called');

    var jwtSecret = 'mysecretkey'; //put in a conf file
    var facebookToken = req.headers['facebooktoken'];

    var path = 'https://graph.facebook.com/me?fields=id,name,picture,email&access_token=' + facebookToken;

    console.log('request send to Facebook graph api: ' + path);

    /** Send http request with the facebook token to Facebook for verification */
    request(path, function(error, response, body) { // here body is the data sent back by Facebook

        var facebookUserData = JSON.parse(body);

        // create a new object containing toke, the new attribute, and then merge/combine with existing object of facebook data
        var newAccess = {
            token: String
        }

        //console.log('facebook user data: ' + facebookUserData);

        if (!error && response && response.statusCode && response.statusCode == 200) {
            if (facebookUserData && facebookUserData.id) {
                console.log('data returned from facebook: ' + JSON.stringify(facebookUserData));

                /** create a new token for local login */
                var accessToken = jwt.sign(facebookUserData, jwtSecret, {
                    //Set the expiration
                    expiresIn: 86400 //we are setting the expiration time of 1 day.
                });

                var new_token = accessToken;

                newAccess.token = new_token;

                console.log('new obj: ' + newAccess);

                console.log('new token sent back: ' + new_token);
                /**
                                console.log('create a new user');
                                const newUser = new FbUser({
                                    id: facebookUserData.id,
                                    name: facebookUserData.name,
                                    email: facebookUserData.email
                                });

                                newUser.save();
                                console.log('facebook user created!')

                                 Save the user in local database */
                FbUser.findOne({ "id": facebookUserData.id }, (err, existingUser) => {
                    if (!existingUser) { // If the user does not exist in local db, then create it  
                        console.log('create a new user');
                        const newUser = new FbUser({
                            id: facebookUserData.id,
                            name: facebookUserData.name,
                            img: facebookUserData.picture.data.url,
                            email: facebookUserData.email
                        });

                        console.log(newUser);

                        try {
                            newUser.save();
                        } catch (error) {
                            console.log('error occurred when saving the user to the database!');
                        }

                        console.log('facebook user created!')
                    } else {
                        console.log('facebook user already exists!');
                        
                    }
                });
                /*try {
                    console.log('facebook user id: ' + facebookUserData.id);
                    
                    // console.log('existing user: ' + existingUser); 
                    if (!existingUser) { // If the user does not exist in local db, then create it  
                        console.log('create a new user');
                        const newUser = new FbUser({
                            id: facebookUserData.id,
                            name: facebookUserData.name,
                            email: facebookUserData.email
                        });

                        newUser.save();
                        console.log('facebook user created!')
                    }
                } catch (error) {
                    console.log(error);
                    //throw error;
                }*/

                //localStorage.setItem('token', new_token); // it should be done in client side

               // Object.assign(facebookUserData, newAccess); // combine two objects
                console.log(Object.assign(facebookUserData, newAccess)); // combine two objects

                res.status(200).json(
                        /*{
                            newToken: new_token,
                            img: facebookUserData.picture.data.url
                        }
                        new_token
                        facebookUserData*/
                        Object.assign(facebookUserData, newAccess) // return combined object containing all required attributes
                    );

            } else {
                res.status(403);
                res.send('Access Forbidden/Denied');
            }
        } else {
            console.log(facebookUserData.error);
            //console.log(response);
            res.status(500);
            res.send('Access Forbidden');
        }


    });



    // res.send('done'); // temp for test
}