'use strict';

const path = require('path');
const multer = require('multer');

// ***********************************************************************************************************
// Implement file upload using MULTER -- it  must work as a middleware to use multer to parse the form data, together with file upload
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './content/imgs/paintings'); // This location must exist, if not, uploading will fail. Create the folder before testing
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    }
});

var upload = multer({ storage: storage }).single('paintingImg');

let paintingRoute = require('express').Router();

let PaintingController = require('../controllers/PaintingController');



paintingRoute.post('/painting', upload, PaintingController.addPainting); // with middleware, upload, for this reoute
paintingRoute.get('/paintings', PaintingController.getAllPaintings); // Usually used by admin
paintingRoute.get('/paintingsinalbum/:id', PaintingController.getAllPaintings);
paintingRoute.get('/painting/:id', PaintingController.getPaintingDetails);
paintingRoute.put('/painting/:id', PaintingController.updatePaintingInAlbum);
paintingRoute.put('/painting/img/:id', upload, PaintingController.updateImgOfPainting);
paintingRoute.delete('/painting/:id', PaintingController.deletePainting);


module.exports = paintingRoute;