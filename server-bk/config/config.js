module.exports = {
    'serverport': 5000,
    'tokenexp': 604800, // one week
    'secret': 'mysecretkey',
    'databaseUrl': 'mongodb://localhost:27017/', //if using mLab, modify this connection string
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