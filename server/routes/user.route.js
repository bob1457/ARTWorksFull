'use strict';
var path = require('path');
var multer = require('multer');

/** File upload */
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './content/avatars'); // This location must exist, if not, uploading will fail. Create the folder before testing
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    }
});

var upload = multer({ storage: storage }).single('userPhoto');

/** */

let userRoute = require('express').Router();

let UserController = require('../controllers/UserController');

userRoute.post('/register', UserController.signup);
userRoute.post('/login', UserController.login);
userRoute.get('/users', UserController.users);
userRoute.get('/user/:id', UserController.getuserDetails);
userRoute.put('/user/:id', UserController.updateUser);
//userRoute.post('/photo', UserController.updateAvatar);
userRoute.post('/avatar/:id', upload, UserController.updateAvatar);


module.exports = userRoute;