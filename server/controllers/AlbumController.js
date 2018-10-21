'use strict';

var mongooose = require('mongoose'),
    path = require('path'),
    multer = require('multer'),
    Album = require('../models/album');


exports.addAlbum = function(req, res, next) {
    const name = req.body.name;
    const desc = req.body.desc;
    const userId = req.body.userId;

    const album = new Album({
        name: name,
        desc: desc,
        userId: userId
    });

    if (!name || !userId) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.' });
    }

    album.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests",
                createdAlbum: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.updateAlbum = function(req, res, next) {
    const name = req.body.name;
    const desc = req.body.desc;
    const albumid = req.params.id;


    Album.findById(albumid).exec(function(err, album) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
        if (album) {
            album.name = name;
            album.desc = desc;
        }

        album.save(function(err) {
            if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
            res.status(201).json({
                success: true,
                message: 'Album updated successfully'
            });
        });
    });

};

exports.getAlbums = function(req, res, next) {
    Album.find({}, (err, albums) => {
        if (err) return res.status(500).send("There was a problem finding the albums.");
        res.status(200).send(albums);
    })
};

exports.getAlbumDetails = function(req, res, next) {
    Album.find({ _id: req.params.id }).exec(function(err, album) {
        if (err) { res.status(400).json({ success: false, message: 'Error processing request ' + err }); }
        res.status(201).json({
            success: true,
            data: album
        });
    });
};

exports.uploadLogo = (req, res, next) => {

    // File Upload
    var storage = multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, './content/imgs'); // This location must exist, if not, uploading will fail. Create the folder before testing
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + "." + path.extname(file.originalname));
        }
    });

    var upload = multer({ storage: storage }).single('albumLogo');

    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        console.log(req.file);
        // extract the new filename and path and update in the db
        res.end("File is uploaded");
    });
};