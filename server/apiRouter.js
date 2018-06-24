'use strict';

const path = require('path');
const multer = require('multer');

// ***********************************************************************************************************
// Implement file upload using MULTER -- it  must work as a middleware to use multer to parse the form data, together with file upload
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
    callback(null, './content/imgs/paintings'); // This location must exist, if not, uploading will fail. Create the folder before testing
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    }
});

var upload = multer({ storage : storage}).single('paintingImg');

// ***********************************************************************************************************



// start the route    
let apiRoute = require('express').Router();



// Import controllers
let UserController = require('./controllers/UserController');
let AlbumController = require('./controllers/AlbumController');
let PaintingController = require('./controllers/PaintingController');




apiRoute.get('/', (req, res, next)=>{
    res.json({ message: 'hooray! welcome to our api!' });
});

// Configure all endpoint will be pre-fixed by /api

// NOTE: if connect to localhost:3000/ then it goes to without prefix /api (below), if connect to localhost:3000/api, then it goes to router.get(..)

apiRoute.post('/register', UserController.signup);
apiRoute.post('/login', UserController.login);
apiRoute.get('/users', UserController.users);
apiRoute.get('/user/:id', UserController.getuserDetails);
apiRoute.put('/user/:id', UserController.updateUser);
apiRoute.post('/photo', UserController.uploadAvatar);

apiRoute.get('/albums', AlbumController.getAlbums);
apiRoute.post('/album', AlbumController.addAlbum); //create album based on user _id (POST), which passed through form body, not as a parameter
apiRoute.put('/album/:id', AlbumController.updateAlbum);
apiRoute.get('/album/:id', AlbumController.getAlbumDetails);
apiRoute.post('/album/logo', AlbumController.uploadLogo);

apiRoute.post('/painting', upload, PaintingController.addPainting); // with middleware, upload, for this reoute
apiRoute.get('/paintings', PaintingController.getAllPaintings); // Usually used by admin
apiRoute.get('/paintingsinalbum/:id', PaintingController.getAllPaintings);
apiRoute.get('/painting/:id', PaintingController.getPaintingDetails);
apiRoute.put('/painting/:id', PaintingController.updatePaintingInAlbum);
apiRoute.put('/painting/img/:id', upload, PaintingController.updateImgOfPainting);
apiRoute.delete('/painting/:id', PaintingController.deletePainting);




module.exports = apiRoute;