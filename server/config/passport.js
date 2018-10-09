'use strict';

var passport = require('passport'),
    config = require('./config'),
    FacebookTokenStrategy = require('passport-facebook-token'),
    FbUser = require('mongoose').model('FbUser');

module.exports = function() {

    passport.use(new FacebookTokenStrategy({
            clientID: config.facebookauth.clientID, // 'YOUR-FACEBOOK-CLIENT-ID',
            clientSecret: config.facebookauth.clientSecret // 'YOUR-FACEBOOK-CLIENT-SECRET'
        },
        function(accessToken, refreshToken, profile, done) {
            User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));

};