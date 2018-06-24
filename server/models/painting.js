'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PaintingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    desc:String,
    caption: String,
    albumId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Album'
    },
    imagePathUrl:{
        type:String
    }
}, {timestamps:true});


module.exports = mongoose.model('Painting', PaintingSchema);
