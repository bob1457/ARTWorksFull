var path = require('path'),
    User = require('../models/user'), // import the user from the model
    multer = require('multer'),
    // user = require('../models/user'),
    // userService = require('../services/user.service');
    jwt = require('jsonwebtoken'),
    config = require('../config/config');
//var gravatar = require('gravatar');



exports.signup = (req, res, next) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const birthyear = req.body.birthyear;
    var role = "";
    var dt = new Date();
    var currentyear = dt.getFullYear();
    var age = currentyear - birthyear;
    //console.log(email);

    if (age > 19) {
        role = "parent";
    } else {
        role = "child";
    }

    //console.log(role);


    if (!email || !username || !password || !birthyear) {

        return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.' });
    }

    /*
        userService.signup(email, username, password, birthyear, role);
    */
    User.findOne({ username: username }, function(err, existingUser) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

        // If user is not unique, return error
        if (existingUser) {
            return res.status(201).json({
                success: false,
                message: 'Username already exists.'
            });
        }
        /* Will use gravatar in production
                const avatar = gravatar.url(req.body.email, {
                    s: '50', //Size
                    r: 'pg', // Raging
                    d: 'mm' //Default
                });
        */
        // If no error, create account
        let oUser = new User({
            //firstname: firstname,
            //lastname: lastname,
            email: email,
            username: username,
            password: password,
            birthyear: birthyear,
            role: role,
            //avatar, will use gravatar later in production
            createdOn: new Date()
        });

        oUser.save(function(err, oUser) {
            if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                registeredUser: oUser
            });


        });

    });
};


exports.login = function(req, res, next) {
    // find the user
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

        if (!user) {
            res.status(201).json({ success: false, message: 'Authentication failed. Incorrect login credentials.' });
        } else if (user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: config.tokenexp
                    });

                    let last_login = user.lastlogin;

                    // login success update last login
                    user.lastlogin = new Date();


                    user.save(function(err) {
                        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

                        res.status(201).json({
                            success: true,
                            userData: user,
                            message: { 'userid': user._id, 'username': user.username, 'firstname': user.firstname, 'lastlogin': last_login },
                            token: token
                        });
                    });
                } else {
                    res.status(201).json({ success: false, message: 'Incorrect login credentials.' });
                }
            });
        }
    });
};

exports.users = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    })
};

exports.getuserDetails = function(req, res, next) {
    User.find({ _id: req.params.id }).exec(function(err, user) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
        res.status(201).json({
            success: true,
            data: user
        });
    });
};

exports.updateUser = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const userid = req.params.id;
    const street = req.body.street;
    const city = req.body.city;
    const provstate = req.body.provstate;
    const postzipcode = req.body.provstate;
    const country = req.body.country;

    /*
    const address = {
        type: req.body.type,
        street: req.body.street,
        city: req.body.city,
        provstate: req.body.provstate,
        postzipcode: req.body.postzipcode,
        country: req.body.country
    }    
    */

    User.findById(userid).exec(function(err, user) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
        if (user) {
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;
            user.telephone = telephone;
            user.street = street;
            user.city = city;
            user.provstate = provstate;
            user.provstate = postzipcode;
            user.country = country;
            user.updatedOn = Date.now();
            //user.address.push(address);
        }

        user.save(function(err) {
            if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
            res.status(201).json({
                success: true,
                message: 'User profile updated successfully'
            });
        });
    });

};


exports.uploadAvatar = (req, res, next) => {

    // File Upload
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './content/avatars'); // This location must exist, if not, uploading will fail. Create the folder before testing
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + "." + path.extname(file.originalname));
        }
    });

    var upload = multer({ storage: storage }).single('userPhoto');

    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        console.log(req.file);
        // extract the new filename and path and update in the db
        res.end("File is uploaded");
    });
};