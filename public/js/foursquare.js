"use strict";

const Foursquare = {
    getFriends: () => {
        let url = '/v2/checkins/recent?m=foursquare&v=20170101';
        return OAuth.create('foursquare').get(url).then((response) => {
            let friends = response.response.recent;

            friends.map(function(friend){
                console.log('friends',friend);
            });

            return friends;
        });
    }
};