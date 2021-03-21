import React from 'react';
import { Badge } from 'react-bootstrap';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import * as RoutePath from '../../constants/route-paths';
import { getPostTypeByValue } from '../../constants/post-types';
import { Link } from 'react-router-dom';
import { ImpactAreasRender, InfoRender } from '../form_template/details-render';
import { LikeButtonRender, GoingButtonRender } from '../form_template/buttons-render';
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
const PostRender = ({ post }) => {
    return (
        <div className="post-map-box">
            <h6>
                <Badge variant="primary">{getPostTypeByValue(post.postType)[0].label}</Badge>
            </h6>
            <Link to={RoutePath.postDetailsPage(post.postType, post._id)}>
                <h5 style={{ color: 'cadetblue' }}>{post.title}</h5>
            </Link>
            {post.organizationName && post.organizationName.length > 0 && (
                <Link to={RoutePath.userDetailsPage('organization', post.creatorId)}>
                    <h6 style={{ color: 'cadetblue' }}>{post.organizationName[0]}</h6>
                </Link>
            )}
            {ImpactAreasRender('', post.impactAreaNames)}
            {InfoRender('', post.address.fullAddress)}
            <hr />
            <LikeButtonRender /> &nbsp;
            <GoingButtonRender />
        </div>
    );
};
const AllPostOnMap = (props) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const markers = props.allPosts;
    console.log('🚀 ~ file: post-map-view.js ~ line 27 ~ AllPostOnMap ~ markers', markers);
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
                        <PostRender post={selected} />
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
};
export default AllPostOnMap;
