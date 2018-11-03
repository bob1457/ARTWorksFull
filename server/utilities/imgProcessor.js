'use strict';

var jimp = require('jimp');

var imgPath = './content/avatars/'

module.exports = {

    resize(file) {
        var img = new jimp(file.buffer, (err, image) => {
            if(err) {
                console.log(err);
            } else {
                image.resize(50, 50)
                .write(imgPath + 'newImg');
                console.log('image processed successfully!');
            }            
        })

        return img;
    }
}