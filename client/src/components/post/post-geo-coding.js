import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
// const google = window.google;
const mapContainerStyle = {
    height: '100vh',
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
let center = {
    lat: 43.6532,
    lng: -79.3832,
};
const searchBoxStyle = {
    width: '100%',
};
const PostGeoCoding = (props) => {
    //selectedLocation={props.location}
    //handleLocationChange={props.handleLocationChange}

    const libraries = ['places'];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const marker = props.selectedLocation;
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    const mapRef = React.useRef();
    const onMapClick = (e) => {
        props.handleLocationChange({
            latitude: e.latLng.lat(),
            longitude: e.latLng.lng(),
        });
    };
    const panTo = ({ lat, lng }) => {
        props.handleLocationChange({
            latitude: lat,
            longitude: lng,
        });
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    };
    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading maps';
    else {
        center = {
            lat: parseFloat(marker.latitude),
            lng: parseFloat(marker.longitude),
        };
        return (
            <div>
                <SearchBoxRender panTo={panTo} />
                <br />
                <GoogleMap id="map" onLoad={onMapLoad} mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options} onClick={onMapClick}>
                    {marker.latitude && marker.longitude && (
                        <Marker
                            key={`${marker.latitude}-${marker.longitude}`}
                            position={{
                                lat: parseFloat(marker.latitude),
                                lng: parseFloat(marker.longitude),
                            }}
                        />
                    )}
                </GoogleMap>
            </div>
        );
    }
};
const SearchBoxRender = ({ panTo }) => {
    const handleInput = (e) => {
        setValue(e.target.value);
    };
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 43.6532, lng: () => -79.3832 },
            radius: 100 * 1000,
        },
    });

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {}
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput style={searchBoxStyle} value={value} onChange={handleInput} disabled={!ready} placeholder="Search your location" />
            <ComboboxPopover>
                <ComboboxList key={1}>
                    {status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id + description} value={description} />)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};
export default PostGeoCoding;
