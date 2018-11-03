'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    desc:String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    },
    logoImgUrl:{
        type:String,
        default: "/content/imgs/album_logo.png"
    }
}, {timestamps:true});








module.exports = mongoose.model("Album", AlbumSchema);