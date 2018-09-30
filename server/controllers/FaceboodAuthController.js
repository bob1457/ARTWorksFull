var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy; // possible use of passport-facebook-token strategy?
var config = require('../config/config');
var User = require('../models/user');

passport.use(new FacebookStrategy({
        clientID: config.facebookauth.clientID, //FACEBOOK_APP_ID,
        clientSecret: config.facebookauth.clientSecret, // FACEBOOK_APP_SECRET,
        callbackURL: config.facebookauth.callbackURL, // "http://www.example.com/auth/facebook/callback"
        profileFields: ['id', 'displayname', 'photos']
    },
    function(accessToken, refreshToken, profile, done) { // the callback function
        /*

        1. Check to see if the user exists in our system (DB)a;
        2. if not, create one and return the user profile from Facebook
        3. if exists, simply return the profile

        User.findOrCreate('...', function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });*/
        process.nextTick(function() {
            User.findOne({ 'facebook.id': profile.id }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(user);
                } else {
                    var newUser = new User();
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = accessToken;
                    newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    newUser.facebook.email = profile.emails[0].value;

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    })
                    console.log(profile);
                }
            })
        })
    }
));

exports.authenticate = function(req, res, next) {
    passport.authenticate('facebook');
}

exports.authenticateCB = function(req, res, next) {
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
}