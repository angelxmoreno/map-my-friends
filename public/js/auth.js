"use strict";

const Auth = {
    token_url: '/create_token',
    init: (config) => {
        OAuth.initialize(config.keys.public);
    },
    login: (successFunc, failFunc) => {
        Auth.getToken()
            .done(successFunc)
            .fail(failFunc);
    },
    logout: (successFunc, failFunc) => {
        firebase.auth().signOut();
        OAuth.clearCache();
    },
    getToken: function () {
        let user, access_token, provider;

        return OAuth.popup('foursquare', {
            cache: true
        }).then((foursquare) => {
            access_token = foursquare.access_token;
            provider = foursquare.provider;

            return foursquare.me();
        }).then((me) => {
            user = me.raw.response.user;
            user.access_token = access_token;
            user.provider = provider;

            return user;
        }).then(Auth.createJWT).then((response) => {
            let token = response.token;

            return firebase.auth().signInWithCustomToken(token).then((currentUser) => {

                console.info('currentUser', currentUser);
                currentUser.updateProfile({
                    displayName: user.firstName + ' ' + user.lastName,
                });

                return currentUser;
            });
        })

    },
    createJWT: (user) => {
        return $.ajax({
            method: "POST",
            url: Auth.token_url,
            data: {
                user: user
            }
        });
    }
};
