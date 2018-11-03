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
        async(accessToken, refreshToken, profile, done) => {

            try {

                console.log('profile', profile);
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);

                FbUser.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
                    return done(err, user);
                });

            } catch (error) {
                done(error, false, error.message);
            }

        }));

};