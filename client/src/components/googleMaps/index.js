import React, { useEffect } from 'react';
import API from '../../utils/API';
// import API from '../../utils/API';
import './style.css';

function GoogleMaps() {
    useEffect(() => {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 46.85, lng: -121.76 },
            zoom: 7,
        });

        API.getLocations()
            .then((response) => {
                console.log(response);
                response.forEach((marker) => {
                    new google.maps.Marker({
                        position: marker.latLng,
                        map,
                    });
                });
            })
            .catch((error) => console.log({ error: error }));
    }, []);

    return (
        <div className="mapWrapper">
            <div id="map" />
        </div>
    );
}

export default GoogleMaps;
