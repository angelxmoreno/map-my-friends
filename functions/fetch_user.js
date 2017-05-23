// Setup 4SQ
const sq_config = {
    'secrets': {
        'clientId': '3WNSHOPAKQ0RMWUQY0VXLNRJOHVKSKJMMGAVLNF4MG20GPL1',
        'clientSecret': 'EXTL1NQ0GDDHKAU5ZZUQKLOV0DJ555JUB1A3YCUIKZRNEI4R',
        'redirectUrl': 'https://oauth.io/auth'
    }
};

const Foursquare = require('node-foursquare')(sq_config);

module.exports = (access_token, cb) => {
    if (!access_token) {
        cb(null, {
            status: 403,
            access_token: access_token,
            msg: 'No access token provided',
            err: new Error('No access token provided')
        });
    } else {
        Foursquare.Users.getUser('self', access_token, cb);
    }
};