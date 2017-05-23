'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.GCLOUD_PROJECT}.firebaseio.com`
});

exports.create_token = functions.https.onRequest((req, res) => {
    console.info('req.body', req.body);
    let user = req.body.user;

    if (user == undefined) {
        res.status(200).send({
            msg: 'No user sent',
            body: req.body
        });
    } else {
        let uid = user.provider + '-' + user.id;

        admin.auth().createCustomToken(uid, user).then(function (customToken) {
            res.status(200).send({
                token: customToken,
                uid: uid,
                user: user
            });
        }).catch(function (error) {
            res.status(200).send({
                msg: error.message,
                error: error
            });
        });
    }
});
