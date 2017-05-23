"use strict";

const Controller = {
    main: function (context) {
        context.partial('views/home.template', {
            greeting: 'Hello, JS-3.20!'
        });
    },
    friends: function (context) {
        context.partial('views/friends.template').then(function () {
            let markers = {};

            $('#friends-list').on('click', 'a', function (e) {
                e.preventDefault();
                let marker_id = $(this).data('markerId');
                let marker = markers[marker_id];

                console.log(marker);
                Map.goolgeMap.panTo(marker.getPosition());

                if (Map.goolgeMap.getZoom() !== 18) {
                    Map.goolgeMap.setZoom(18);
                }
            });

            Map.init();

            let bounds = new google.maps.LatLngBounds();
            Foursquare.getFriends().then((friends) => {
                friends.forEach((friend) => {
                    let user = friend.user;
                    let venue = friend.venue;
                    let location = venue.location;

                    let marker = Map.addMarker({
                        title: user.firstName + ' ' + user.lastName,
                        icon: user.photo.prefix + 'cap32' + user.photo.suffix,
                        lat: location.lat,
                        lng: location.lng
                    });
                    let marker_id = user.id;

                    bounds.extend(marker.getPosition());
                    markers[marker_id] = marker;
                    context.render('views/partials/friend_row.template', {
                        user: user,
                        venue: venue,
                        marker_id: marker_id
                    }).appendTo('#friends-list')
                });
                Map.goolgeMap.fitBounds(bounds);
            });
        });
    }
};