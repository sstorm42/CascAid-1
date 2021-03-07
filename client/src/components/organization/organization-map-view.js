import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import * as RoutePath from '../../constants/route-paths';
import { Button } from 'react-bootstrap';
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
const AllOrganizationOnMap = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const markers = props.allOrganizations;
    console.log('🚀 ~ file: organization-map-view.js ~ line 27 ~ AllOrganizationOnMap ~ markers', markers);

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
                    if (marker.basicInfo.address && marker.basicInfo.address.latitude && marker.basicInfo.address.longitude) {
                        return (
                            <Marker
                                key={`${i}.${marker.lat}-${marker.lng}`}
                                position={{
                                    lat: marker.basicInfo.address.latitude,
                                    lng: marker.basicInfo.address.longitude,
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
                            lat: selected.basicInfo.address.latitude,
                            lng: selected.basicInfo.address.longitude,
                        }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h4>Organization</h4>
                            <b>Name: </b>
                            {selected.basicInfo.name}

                            <br />
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {
                                    props.gotoOrganizationDetails(selected.userId);
                                }}
                            >
                                Details
                            </Button>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
};
export default AllOrganizationOnMap;
