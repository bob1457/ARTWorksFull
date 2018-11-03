/* ****************************************************************************************************

Major application code

**************************************************************************************************** */
'use strict';

var express = require("express");
var path = require('path');
//var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//var multer = require('multer');
//var upload = multer();
//var jsonwebtoken = require("jsonwebtoken");
var cors = require("cors");
var app = express();

app.use(cors());

var imgPath = path.join(__dirname, 'content');
//console.log(imgPath);

app.use(express.static(imgPath));
//var multer = require('multer');

// Connect to mongodb
require('./config/db'); // or let db = required('./db); if db is needed in this file

// include body-parser for parsing input data - bodyparser caused file upload failure: parsing json error - to be investigated, the following works!!!

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(multer);
//app.use(upload.array());
//app.use(express.static('public'));

// use mogan to log requiests to the console
app.use(morgan('dev'));

// enable CORS from client-side
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

/* ******************************************************************************* 

API Route Definition

******************************************************************************** */

//var router = express.Router();

/****************************************************************/
// All webapi routes - endpoints
/****************************************************************/
var router = require('./apiRouter');
//var router = require('./routes');


// Import controllers
// let UserController = require('./controllers/userController');

/*
// File Upload
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads'); // This location must exist, if not, uploading will fail. Create the folder before testing
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now() + "." + path.extname(file.originalname));
    }
});

var upload = multer({ storage : storage}).single('userPhoto');
*/






// Basic route configuration


/*
router.get('/', (req, res, next) => {
    res.json({ message: 'hooray! welcome to our api!' });
});
*/

// Configure all endpoint will be prefixed by /api

// NOTE: if connect to localhost:3000/ then it goes to without prefix /api (below), if connect to localhost:3000/api, then it goes to router.get(..)

app.use('/api', router);



// Basic route without prefix ./api
app.get('/', function(req, res, mext) {
        console.log('Basic web api at root endpoint...');
        res.send("basic webapi point...running!");
        // res.sendFile(__dirname + "/index.html"); // serve statis file
    })
    /*
    app.post('/api/avatar',function(req,res){
        upload(req,res,function(err) {
            if(err) {
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });
    */





// User routes
// router.post('/photo', UserController.uploadAvatar); // Remainder: the routes that use router.get or so will have a prefix: /api


module.exports = app;