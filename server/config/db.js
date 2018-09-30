var mongoose = require('mongoose');
var config = require('./config');

let dbName = config.dbName;
let dbUrl = config.databaseUrl;

//connect to db 
mongoose.connect(`${dbUrl}${dbName}`, function(err) {
    if (err) {
        console.log('Error connecting the database, please check if MongoDb is running.');
    } else {
        console.log(`Connected to the database.... ${dbName}`);
    }
});