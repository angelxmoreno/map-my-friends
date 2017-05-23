"use strict";

const Model = {
    init: (config) => {
        firebase.initializeApp(config);
    },
    saveUser: (response) => {
        let user = response.toJson();
        Model.database.ref('test/' + user.access_token).set(user);
    }
};