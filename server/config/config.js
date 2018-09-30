module.exports = {
    'serverport': 3000,
    'tokenexp': 604800, // one week
    'secret': 'mysecretkey',
    'databaseUrl': 'mongodb://localhost:27017/', //if using mLab, modify this connection string
    'dbName': 'artworks',
    'facebookauth': {
        'clientID': '2244240055794794',
        'clientSecret': 'c62cba1a7d662e11ca14c4ee5b49fcc8',
        'callbackURL': 'http://localhost:3000/auth/fb/callback'
    }
};