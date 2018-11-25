module.exports = {
    'serverport': 5000,
    'tokenexp': 604800, // one week
    'secret': 'mysecretkey',
    //'databaseUrl': 'mongodb://192.168.99.100:27117/', //container mongodb, //if using mLab, modify this connection string
    'databaseUrl': 'mongodb://localhost:27017/', // local mongodb
    'dbName': 'artworks',
    'mailsettings': {
        'service':'gamil',
        'username':'',
        'password': ''
    },
    'facebookauth': {
        'clientID': '2244240055794794',
        'clientSecret': 'c62cba1a7d662e11ca14c4ee5b49fcc8',
        'callbackURL': 'http://localhost:3000/auth/fb/callback'
    }
};