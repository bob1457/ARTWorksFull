'use strict';

let facebookRoute = require('express').Router();

let FacebookController = require('../controllers/FaceboodAuthController');

facebookRoute.get('/fb', FacebookController.facebook); // verify the token from facebook and create a local user



module.exports = facebookRoute;