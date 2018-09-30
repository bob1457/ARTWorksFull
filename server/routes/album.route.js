'use strict';

let albumRoute = require('express').Router();

let AlbumController = require('../controllers/AlbumController');

albumRoute.get('/albums', AlbumController.getAlbums);
albumRoute.post('/album', AlbumController.addAlbum); //create album based on user _id (POST), which passed through form body, not as a parameter
albumRoute.put('/album/:id', AlbumController.updateAlbum);
albumRoute.get('/album/:id', AlbumController.getAlbumDetails);
albumRoute.post('/album/logo', AlbumController.uploadLogo);

module.exports = albumRoute;