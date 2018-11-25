'use strict';

var mongoose = require('mongoose');
//var bcrypt = require('bcrypt-nodejs');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    /*role: {
        type:String,
        enum: ["admin", "member"]
    },*/
    birthyear: {
        type: Number,
        trim: true
    },
    password: {
        type: String//,
        //required: true // can be enforced at client side
    },

    // the attributers shown below as user profile
    firstname: {
        type: String,
        trim: true
    },
    lastname: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["parent", "child"]
    },

    //address: [AddressSchema], 
    street: {
        type: String
    },
    city: {
        type: String
    },

    provstate: {
        type: String
    },
    postzipcode: {
        type: String
    },
    country: {
        type: String
    },
    telephone: {
        type: String
    },
    avatar: {
        type: String, // Will use gravatar instead
        default: "/default.png" // This could be the default avatar if no avatar associated with user's email (configured in user controller)
    },
    createdOn: {
        type: Date,
        default: Date.now
    },

    /** for forgot/reset password ? */
    reset_password_token: {
        type: String
    },
    reset_password_expires: {
        type: Date
    },


    updatedOn: {
        type: Date,
        default: Date.now
    },
    lastlogin: { type: Date }
}, { timestamps: true });


//hashing a password before saving it to the database
UserSchema.pre('save', function(next) {
    var users = this,
        SALT_FACTOR = 12; // 10; // 12 for better security

    if (!users.isModified('password')) return next();
    console.log('hashing password before saving...');
    console.log(users.password);
    

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        console.log('error from pre: '+ err);
        if (err) return next(err);

        console.log(SALT_FACTOR);

        bcrypt.hash(users.password, salt, /*null,*/ function(err, hash) {
            if (err) return next(err);
            users.password = hash;
            next();
        });
    });

});

//authenticate input against database 
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return cb(err); }
        console.log('user password for login: ' + candidatePassword);
        cb(null, isMatch);
    });
};



module.exports = mongoose.model('User', UserSchema); //, 'users'); // by default, mongoose use 'User' to map to the collection 'users'