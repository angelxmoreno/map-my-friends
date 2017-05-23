'use strict';

const Map = {
    goolgeMap: null,
    options: {
        center: {
            lat: -34.397, lng: 150.644
        },
        zoom: 8
    },
    init: () => {
        Map.initGoogleMap();
    },
    initGoogleMap: () => {
        Map.goolgeMap = new google.maps.Map(document.getElementById('map'), Map.options);
    },
    addMarker: (options) => {
        options.map = Map.goolgeMap;
        if (options.lat && options.lng) {
            options.position = {
                lat: options.lat,
                lng: options.lng
            }
        }
        let marker = new google.maps.Marker(options);
        return marker;
    }
};
