'use strict';

var auth = require('../utilities/check-auth');

let albumRoute = require('express').Router();

let AlbumController = require('../controllers/AlbumController');

albumRoute.get('/albums', AlbumController.getAlbums);
albumRoute.post('/album', auth, AlbumController.addAlbum); //create album based on user _id (POST), which passed through form body, not as a parameter
albumRoute.put('/album/:id', auth, AlbumController.updateAlbum);
albumRoute.get('/album/:id', AlbumController.getAlbumDetails);
albumRoute.post('/album/logo', auth, AlbumController.uploadLogo);

module.exports = albumRoute;