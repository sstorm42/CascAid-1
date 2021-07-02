import React from 'react';
import { Badge, Container, Row, Col } from 'react-bootstrap';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import * as RoutePath from '@Constants/route-paths';
import { getPostTypeByValue } from '@Constants/post-types';
import { Link } from 'react-router-dom';
import { ImpactAreasRender, InfoRender } from '../form_template/details-render';
import { interestTypes } from '@Constants/interest-types';
import { LikeButtonRender, InterestedButtonRender, GoingButtonRender, FollowButtonRender, UnfollowUserButtonRender } from '../form_template/buttons-render';
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
const PostRender = (props) => {
    const { post, followingObject, userId } = props;
    let interest = {};
    let filter = post.interests.filter((interest) => interest.userId === userId);
    if (filter && filter.length > 0) interest = filter[0];
    return (
        <Container className="post-map-box">
            <h6>
                <Badge variant="primary">{getPostTypeByValue(post.postType)[0].label}</Badge>
            </h6>
            <Link to={RoutePath.postDetailsPage(post.postType, post._id)}>
                <h5 style={{ color: 'cadetblue' }}>{post.title}</h5>
            </Link>
            {post.organizationName && post.organizationName.length > 0 && (
                <Link to={RoutePath.userDetailsPage('organization', post.creatorId)}>
                    <h6 style={{ color: 'cadetblue' }}>{post.organizationName}</h6>
                </Link>
            )}
            {ImpactAreasRender('', post.impactAreas)}
            {InfoRender('', post.address.fullAddress)}
            <hr />
            <Row>
                <Col>
                    {interestTypes[post.postType].like ? (
                        interest.liked ? (
                            <LikeButtonRender
                                complete={true}
                                onClick={() => {
                                    props.handleCancelLikePost(post._id);
                                }}
                            />
                        ) : (
                            <LikeButtonRender
                                complete={false}
                                onClick={() => {
                                    props.handleLikePost(post._id);
                                }}
                            />
                        )
                    ) : (
                        <></>
                    )}
                    &nbsp;
                    {interestTypes[post.postType].interested ? (
                        interest.interested ? (
                            <InterestedButtonRender
                                complete={true}
                                onClick={() => {
                                    props.handleCancelInterestedPost(post._id);
                                }}
                            />
                        ) : (
                            <InterestedButtonRender
                                complete={false}
                                onClick={() => {
                                    props.handleInterestedPost(post._id);
                                }}
                            />
                        )
                    ) : (
                        <></>
                    )}
                    &nbsp;
                    {interestTypes[post.postType].going ? (
                        interest.going ? (
                            <GoingButtonRender
                                complete={true}
                                onClick={() => {
                                    props.handleCancelGoingPost(post._id);
                                }}
                            />
                        ) : (
                            <GoingButtonRender
                                complete={false}
                                onClick={() => {
                                    props.handleGoingPost(post._id);
                                }}
                            />
                        )
                    ) : (
                        <></>
                    )}
                    &nbsp;
                </Col>
                <Col>
                    {followingObject[post.creatorId] ? (
                        <UnfollowUserButtonRender
                            onClick={() => {
                                props.handleUnfollowClick(post.creatorId);
                            }}
                        />
                    ) : (
                        <FollowButtonRender
                            onClick={() => {
                                props.handleFollowClick(post.creatorId);
                            }}
                        />
                    )}
                </Col>
            </Row>
        </Container>
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
                        <PostRender post={selected} {...props} />
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
};
export default AllPostOnMap;
