/* ****************************************************************************************************

Server only contains minimum code to start the web server listener, others are contained in app.js

**************************************************************************************************** */

'use strict';

//var express = require("express");
//var path = require('path');
//var multer = require('multer');
// var app = express();
var app = require('./app');
var config = require('./config');

var port = process.env.PORT || config.serverport;


app.listen(port,() => {
    console.log("RESTFul api server running on localhost at port 3000");
});