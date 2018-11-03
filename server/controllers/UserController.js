var path = require('path'),
    User = require('../models/user'), // import the user from the model
    multer = require('multer'),

    // userService = require('../services/user.service');
    mailer = require('../utilities/mailer');
imgProcessor = require('../utilities/imgProcessor'),
    jimp = require('jimp'),
    nodemailer = require('nodemailer');
mailHandler = require('nodemailer-express-handlebars'),
    async = require('async'),
    bcrypt = require('bcrypt');
crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    config = require('../config/config');
//var gravatar = require('gravatar');

var imgPath = path.join(__dirname, 'content/avatars/'); //'./content/avatars/';

/** Start Email Configuration ***********************************************************/
var smtpTransport = nodemailer.createTransport({
    /*service: config.mailsettings.service || 'gmail',
    auth: {
        user: config.mailsettings.username || 'bob.h.yuan@gmail.com',
        pass: config.mailsettings.password || '570924MBA'
        }*/
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'bob.h.yuan@gmail.com',
        pass: '570924MBA'
    }
});

var handlebarsOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve('./content/templates/'),
    extName: '.html'
};

smtpTransport.use('compile', mailHandler(handlebarsOptions));

/** End Email Configuration **************************************************************/




/** 
 * All defined route handler/controller
 */

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

    /**
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
                console.log(isMatch);
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

exports.users = function(req, res, next) { // List all users
    User.find({}, function(err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    })
};

exports.getuserDetails = function(req, res, next) {
    /**/
    //User.find({ _id: req.params.id }).exec(function(err, user) {
    User.findOne({ username: req.params.id }).exec(function(err, user) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
        res.status(201).json( //{
            //success: true,
            //data: user
            //}
            //{user: user}
            user // just return the user object in json format
        );
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

exports.updateAvatar = (req, res, next) => {

    var userid = req.params.id;
    //var fileName = '';
    /*
        // File Upload
        var storage = multer.diskStorage({
            destination: function(req, file, callback) {
                callback(null, './content/avatars'); // This location must exist, if not, uploading will fail. Create the folder before testing
            },
            filename: function(req, file, callback) {
                callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            }
        });

        var upload = multer({ storage: storage }).single('userPhoto');

        upload(req, res, function(err) {
            if (err) {
                return res.end("Error uploading file.");
            }

            console.log(req.file);

            // extract the new filename and path and update in the db
            //res.send("File is uploaded");
            //fileName = file.filename;
        });
    */
    // Resize the image file
    /*
        jimp.read(imgPath + fileName).then(image => {
            image.resize(50, 50)
            .write()
        })

    */
    const file2 = req.file.name;
    jimp.read('./content/avatars/' + req.file.filename).then(img => {
        console.log('resizing... ' + req.file.filename);
        img.resize(50, 50)
            .write('./content/avatars/' + req.file.filename) //;
            .resize(80, 80)
            .write('./content/avatars/md/' + req.file.filename);
        console.log('all resize done...');
        next();
    });

    // Update user data in database

    User.findById(userid).exec(function(err, user) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }

        if (user) {
            //user.avatar = '/avatars/' + req.file.filename;
            user.avatar = '/' + req.file.filename;
        }

        user.save(function(err) {
            if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
            res.status(201).json({
                success: true,
                message: 'User profile updated successfully'
            });
        });
    })


};

exports.forgotPassword = (req, res, next) => {

    console.log('user email: ' + req.body.email);
    var validation_token = '';

    /** Mail configuration 

    var smtpTransport = mailer.createTransport({
        service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
        auth: {
          user: 'bob.h.yuan@gmail.com',
          pass: '570924MBA'
        }
    });

    var smtpTransport = nodemailer.createTransport({
        
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'bob.h.yuan@gmail.com',
            pass: '570924MBA'
        }
    });

    var handlebarsOptions = {
        viewEngine: 'handlebars',
        viewPath: path.resolve('./content/templates/'),
        extName: '.html'
    };

    smtpTransport.use('compile', mailHandler(handlebarsOptions));
*/
    async.waterfall([
        function(done) {
            User.findOne({
                email: req.body.email
            }).exec(function(err, user) {
                if (user) {
                    done(err, user);
                } else {
                    done('User not found');
                }
                console.log(user);
            });

        },
        function(user, done) {
            //create the ramdon token
            crypto.randomBytes(20, function(err, buffer) {
                var token = buffer.toString('hex');
                validation_token = token;
                console.log(token);
                done(err, user, token);
            });
        },
        function(token, user, done) { // Save the password rest token and expiry date in the db fro reset validation
            console.log(req.body.email);
            User.findOneAndUpdate({ email: req.body.email }, { $set: { reset_password_token: validation_token, reset_password_expires: Date.now() + 86400000 } }, (err, new_user) => {
                done(err, token, new_user);
                if (err) {
                    console.log('Error: ' + err);
                } else {
                    console.log(new_user);
                }

                /*{ upsert: true, new: true}).exec(function(err, new_user ) {
                    done(err, token, new_user);
                    if(err) {
                        console.log('Error: ' + err);
                    } else {
                        console.log(new_user);
                    }*/
            });
            //console.log('user updated with token and exp date: ' + token );
        },
        function(token, user, done) {

            var data = {
                to: req.body.email,
                from: 'admin@artworks.com',
                template: 'forgot-password-email',
                subject: 'Password help',
                context: {
                    url: 'http://localhost:4200/reset-password?token=' + validation_token,
                    name: user.username
                }
            };

            //mailer();

            smtpTransport.sendMail(data, function(err) {
                console.log('sending email...');
                if (!err) {
                    return done('Kindly check your email for further instructions');

                } else {
                    return done(err);
                    console.log('bad!!!')
                    console.log(err);
                }

            });
            console.log('mail sent!');
            //return res.send('mail for reset password sent!');
        }
    ], function(err) {
        return res.status(422).json({ message: err });
    });
    /*
        mailer.sendMail(); // Send password-rest email
        res.send('mail sent');
    */
}

exports.resetPassword = (req, res, next) => {

    SALT_FACTOR = 10;

    console.log('coming token: ' + req.body.token);

    User.findOne({
        /**/
        reset_password_token: req.body.token,
        reset_password_expires: {
            $gt: Date.now()
        }
        //reset_password_token: req.body.token
    }).exec(function(err, user) {
        console.log('user found: ' + user);
        if (!user) {
            return res.send('Password reset token is invalid or has expired.');
        }
        if (!err && user) {

            //bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
            //if (err) return next(err);
            //console.log('error occured: ' + err);

            /*  bcrypt.hash(req.body.newPassword, 10, null, (err, hash) => {
                        user.password = hash;
                        console.log('new password - hashed: ' + user.password);
                    });
                   
                    
                    bcrypt.hash(req.body.newPassword, salt, null, (err, hash) => {
                        if (err) return next(err);
                        console.log(hash);
                        user.password = hash;
                        console.log('users new pass: ' + hash);
                        console.log(req.body.newPassword);
                        next();
                    });
                 */
            /*                  user.password = req.body.password;

                                User.findOneAndUpdate(
                                    //console.log('update user passwrod'),
                                    { token: req.body.token}   ,                     
                                    { $set: {password: req.body.password} },
                                    console.log('update user password')
                                );*/



            user.password = req.body.password;
            user.save((err) => {
                    console.log('save user...');
                    if (err) {
                        console.log('error when saving...' + err);
                        return res.status(422).send({
                            message: err
                        });

                    } else {
                        console.log('new password saved!!!');
                        var data = {
                            to: user.email,
                            from: 'admin@artworks.com',
                            template: 'reset-password-email',
                            subject: 'Password Reset Confirmation',
                            context: {
                                name: user.username
                            }
                        };

                        smtpTransport.sendMail(data, (err) => {
                            console.log('sending email...');
                            if (!err) {
                                return res.json({ message: 'Password reset...check your email.' });
                            } else {
                                return res.json(err);
                            }
                        })
                    }

                })
                //})

        } else {
            console.log('user not found!');
        }
    })
}

exports.resetPasswordTemplate = (req, res, next) => {
        return res.sendFile(path.resolve('./content/templates/reset-password-template.html'));
    }
    /**
     * 
     * bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(users.password, salt, null, (err, hash) => {
                if (err) return next(err);
                users.password = hash;
                next();
            });
        });
     */


/** Testing of image processing */

//var jimp = require('jimp');
//var imgPath = path.join(__dirname, 'content') ;
// var imgPath = './content/avatars/'

exports.resizeImg = (req, res, next) => {

    jimp.read('./content/avatars/default.png').then(image => {
            //console.log(image);

            image.resize(50, 50)
                .write('./content/avatars/default.png')
                .resize(100, 100)
                .write('./content/avatars/default-md.png');

            res.send('image resize done!')
        })
        .catch(err => {
            console.log(err);
            res.send('error occurred!')
        })
}