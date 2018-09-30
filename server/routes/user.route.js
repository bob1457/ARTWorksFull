'use strict';

let userRoute = require('express').Router();

let UserController = require('../controllers/UserController');

userRoute.post('/register', UserController.signup);
userRoute.post('/login', UserController.login);
userRoute.get('/users', UserController.users);
userRoute.get('/user/:id', UserController.getuserDetails);
userRoute.put('/user/:id', UserController.updateUser);
userRoute.post('/photo', UserController.uploadAvatar);


module.exports = userRoute;