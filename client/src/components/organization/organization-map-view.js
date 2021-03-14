import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import * as RoutePath from '../../constants/route-paths';
import { getCountryByCode, getStateByCountryAndCode } from '../../constants/country-and-state';
import { Button, Badge } from 'react-bootstrap';
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
    const addressMaker = (address) => {
        let fullAddress = '';
        if (address) {
            if (address.street1) fullAddress += address.street1 + ', ';
            if (address.street2) fullAddress += address.street2 + ', ';
            if (address.city) fullAddress += address.city + ', ';
            if (address.code) fullAddress += address.code + ', ';
            if (address.state) fullAddress += getStateByCountryAndCode(address.country, address.state) + ', ';
            if (address.country) fullAddress += getCountryByCode(address.country);
        }
        return fullAddress;
    };
    const pairsRender = (label, tags) => {
        return (
            <label>
                {label}{' '}
                {tags.map((t, i) => {
                    return i === 0 ? tags.label : ', ' + tags.label;
                })}
            </label>
        );
    };
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
                            <h6>{selected.basicInfo.name}</h6>
                            <label>
                                Organization Type:{' '}
                                {selected.organizationTypes.map((type, i) => {
                                    return (
                                        <Badge variant="primary" key={i}>
                                            {type.label}
                                        </Badge>
                                    );
                                    // return i !== 0 ? ', ' + type.label : type.label;
                                })}
                            </label>
                            <br />
                            <label>
                                Impact Areas:{' '}
                                {selected.impactAreas.map((area, i) => {
                                    // return i !== 0 ? ', ' + area.label : area.label;
                                    return (
                                        <Badge variant="primary" key={i}>
                                            {area.label}
                                        </Badge>
                                    );
                                })}
                            </label>
                            <label>Address: {addressMaker(selected.basicInfo.address)}</label>
                            {/* {pairsRender('Organization Type', selected.basicInfo.organizationTypes)} */}
                            <br />
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {
                                    props.gotoOrganizationDetails(selected.userId);
                                }}
                            >
                                Go to Page
                            </Button>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
};
export default AllOrganizationOnMap;
