'use strict';

var //mongooose = require('mongoose'),
    //path = require('path'),
    //multer = require('multer'),    
    Painting = require('../models/painting');

exports.addPainting = function(req, res, next){
    var title = req.body.title;
    var desc = req.body.desc;
    var caption = req.body.caption;
    var albumId = req.body.albumId;  
    // var fname = ""; 
    //var imgUrl = "content/paintings/imgs/" + fname;  // it will be assigned after the image file is uploaded 
        
/*    

// File Upload
    var storage =   multer.diskStorage({
        destination: function (req, file, callback) {
        callback(null, './content/imgs/paintings'); // This location must exist, if not, uploading will fail. Create the folder before testing
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            fname = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
            imgUrl = imgUrl + fname;
        }
    });

    var upload = multer({ storage : storage}).single('paintingImg');

    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        console.log(req.file);
                
        imgUrl = imgUrl + fname;
        console.log(imgUrl);

        res.end("File is uploaded");
    });
 */   
// Create a record for the painting image

    const painting = new Painting({
        title: title,
        desc: desc, 
        caption: caption,           
        albumId: albumId,
        imagePathUrl:"imgs/paintings/" + req.file.filename  // the path should be '/content/imgs/...' ?
    });

    console.log(req.body);
    //console.log(req.file);
    //console.log(caption);

    if ( !title || !albumId) {
        return res.status(422).json({ success: false, message: 'Posted data is not correct or incomplete.'});
    }

    painting.save()
        .then(result => {
            console.log(result);
            console.log(req.file);
            res.status(201).json({
                message: "Handling POST requests",                
                createdPainting: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                 error: err
        });
    });

};

exports.getAllPaintings = function(req, res, next){
    // console.log("The image directory is " + process.cwd() + "\\content\\imgs\\paintings\\");
    Painting.find({}, (err, painting) => {
        if (err) return res.status(500).send("There was a problem finding the paintings.");
        res.status(200).send(painting);
    });
};

exports.getPaintingsbyAlbum = function(req, res, next){
    Painting.findOne({'albumId': req.body.albumId}, (err, painting) => {
        if (err) return res.status(500).send("There was a problem finding the paintings.");
        res.status(200).send(painting);
    })
};

exports.getPaintingDetails = function(req, res, next){
    Painting.findById(req.params.id).exec(function(err, painting){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err}); }

        var filepath = process.cwd() + "\\content\\imgs\\paintings\\";
        var name = painting.imagePathUrl;
        filepath = filepath + painting.imagePathUrl.substring(23);
        console.log(filepath);
        console.log(painting.imagePathUrl);

            res.status(201).json({
            success: true, 
            data: painting
	    });
    });
};

exports.updatePaintingInAlbum = function(req, res, next){
    const title = req.body.title;
    const desc = req.body.desc;
    const paintingId = req.params.id;
    const caption = req.body.caption;           
    const albumId = req.body.albumId;


    Painting.findById(paintingId).exec(function(err, painting){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }
        if(painting){
            painting.title = title;
            painting.desc = desc;
            painting.caption = caption;
            painting.albumId = albumId; 
        }

        painting.save(function(err){
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
            res.status(201).json({
				success: true,
				message: 'Painting updated successfully!'
			});
        });

    });

};

exports.updateImgOfPainting = function(req, res, next) {
    const paintingId = req.params.id;

    Painting.findById(paintingId).exec(function(err, painting){
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err });}
        if(painting){
            painting.imagePathUrl = "content/imgs/paintings/" + req.file.filename;
        }

        painting.save(function(err){
            if(err){ res.status(400).json({ success: false, message:'Error processing request '+ err }); }
            res.status(201).json({
				success: true,
				message: 'Painting img replaced successfully!'
			});
        })
    })
};

exports.deletePainting = function(req, res, next) {
    var fs = require('fs');
    var imgFilePath = process.cwd() + "\\content\\imgs\\paintings\\";
    var index = imgFilePath.lastIndexOf("/");
    var imgName = "";
/*
    Painting.findById(req.params.id).exec(function(err, painting){        
        imgName = painting.imagePathUrl.substring(23);
        imgFilePath = imgFilePath + imgName;
        // console.log(imgFilePath);

    });
*/    
    //console.log(req.params.id);
    Painting.findByIdAndRemove(req.params.id, (err, painting) => {
        if(err){ res.status(400).json({ success: false, message: 'Error processing request '+ err }); }

        imgName = painting.imagePathUrl.substring(23);
        imgFilePath = imgFilePath + imgName;
        console.log(imgFilePath);
        res.status(200).json({
            success: true,
            message: 'Painting deleted successfully!'
            
            
        });

        fs.unlinkSync(imgFilePath); // Delete the image file
        console.log("file deleted!")
    });

}