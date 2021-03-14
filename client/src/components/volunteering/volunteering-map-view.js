import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import * as RoutePath from '../../constants/route-paths';

import { Link } from 'react-router-dom';
const libraries = ['places'];
const mapContainerStyle = {
    height: '100vh',
    width: '100%',
};

const options = {
    // styles: mapStyles,
    // disableDefaultUI: true,
    zoomControl: true,
};
let center = {
    lat: 43.6532,
    lng: -79.3832,
};
const AllVolunteeringOnMap = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const markers = props.allVolunteerings;

    if (props.currentLocation) {
        if (props.currentLocation.latitude && props.currentLocation.longitude) {
            center = {
                lat: props.currentLocation.latitude,
                lng: props.currentLocation.longitude,
            };
        }
    } else if (markers && markers.length > 0) {
        if (markers[0].address)
            center = {
                lat: markers[0].address.latitude,
                lng: markers[0].address.longitude,
            };
    }
    const [selected, setSelected] = React.useState(null);
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    const mapRef = React.useRef();

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading maps';
    return (
        <div>
            <GoogleMap id="map" mapContainerStyle={mapContainerStyle} zoom={props.zoom ? props.zoom : 3} center={center} options={options} onLoad={onMapLoad}>
                {markers.map((marker, i) => {
                    if (marker.address && marker.address.latitude && marker.address.longitude) {
                        return (
                            <Marker
                                key={`${i}.${marker.lat}-${marker.lng}`}
                                position={{
                                    lat: marker.address.latitude,
                                    lng: marker.address.longitude,
                                }}
                                onClick={() => {
                                    setSelected(marker);
                                }}
                            />
                        );
                    }
                })}
                {selected ? (
                    <InfoWindow
                        position={{
                            lat: selected.address.latitude,
                            lng: selected.address.longitude,
                        }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>Volunteering</h2>
                            <b>Title: </b>
                            {selected.title}

                            <br />
                            <Link to={RoutePath.volunteeringDetailsPage + selected._id}>Details</Link>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
};
export default AllVolunteeringOnMap;
