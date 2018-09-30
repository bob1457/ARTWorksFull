var path = require('path'),
    User = require('../models/user'), // import the user from the model
    multer = require('multer'),
    // user = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config');

exports.signup = (email, username, password, birthyear, role) => {
    /*
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const birthyear = req.body.birthyear;
        var role = "";
        var dt = new Date();
        var currentyear = dt.getFullYear();
        var age = currentyear - birthyear;
        //console.log(age);

        if (age > 19) {
            role = "parent";
        } else {
            role = "child";
        }

        //console.log(role);


        if (!email || !username || !password || !birthyear) {

            return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.' });
        }
    */
    console.log('got here');


    User.findOne({ username: username }, function(err, existingUser, res) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
        console.log(res);
        // If user is not unique, return error
        if (existingUser) {
            return res.status(201).json({
                success: false,
                message: 'Username already exists.'
            });
        }

        // If no error, create account
        let oUser = new User({
            //firstname: firstname,
            //lastname: lastname,
            email: email,
            username: username,
            password: password,
            birthyear: birthyear,
            role: role,
            createdOn: new Date()
        });

        oUser.save(function(err, oUser) {
            if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

            res.status(201).json({
                success: true,
                message: 'User created successfully, please login to access your account.',
                registeredUser: oUser
            });


        });

    });
};