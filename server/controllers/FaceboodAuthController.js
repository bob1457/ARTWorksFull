var mongooose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    request = require('request'),
    //path = require('path'),
    //multer = require('multer'),
    FbUser = require('../models/facebook.user');

exports.facebook = function(req, res, next) {
    console.log('face book api called');

    var jwtSecret = 'mysecretkey'; //put in a conf file
    var facebookToken = req.headers['facebooktoken'];

    var path = 'https://graph.facebook.com/me?access_token=' + facebookToken;

    console.log('request send to Facebook graph api: ' + path);

    /** Send request with the facebook token to Facebook for verification */
    request(path, function(error, response, body) {

        var facebookUserData = JSON.parse(body);

        // console.log('facebook user data: ' + facebookUserData);

        if (!error && response && response.statusCode && response.statusCode == 200) {
            if (facebookUserData && facebookUserData.id) {
                console.log('data returned from facebook: ' + facebookUserData.id);

                /** create a new token for local login */
                var accessToken = jwt.sign(facebookUserData, jwtSecret, {
                    //Set the expiration
                    expiresIn: 86400 //we are setting the expiration time of 1 day.
                });

                var new_token = JSON.stringify(accessToken);

                console.log('new token sent back: ' + new_token);

                /** Save the user in local database */




                res.status(200).send(new_token);

            } else {
                res.status(403);
                res.send('Access Forbidden/Debined');
            }
        } else {
            console.log(facebookUserData.error);
            //console.log(response);
            res.status(500);
            res.send('Access Forbiden');
        }


    });



    // res.send('done'); // temp for test
}