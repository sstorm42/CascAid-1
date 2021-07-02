import { getGallery } from '@Actions/post-action';
import { PostImageModalRender } from '@Components/form_template/image-modal-render';
import GalleryView from '@Components/post/gallery-view';
import * as RoutePaths from '@Constants/route-paths';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import OrganizationSideMenu from './organization-side-menu';
const OrganizationGallery = (props) => {
    const [loading, setLoading] = useState(false);
    const [imageDetailsModal, setImageDetailsModal] = useState(false);
    const [image, setImage] = useState('');

    useEffect(() => {
        alert('Came here');
        const getInitialInfo = () => {
            setLoading(true);
            const organizationId = props.match.params.userId;
            console.log('🚀 ~ file: organization-gallery.js ~ line 19 ~ getInitialInfo ~ organizationId', organizationId);
            props.dispatch(getGallery(organizationId));
            setLoading(false);
        };
        getInitialInfo();
    }, []);

    const gotoPostDetails = (postType, postId) => {
        props.history.push(RoutePaths.postDetailsPage(postType, postId));
    };
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col className="right-align" sm="2">
                            <OrganizationSideMenu activePage="Gallery" {...props} />
                        </Col>
                        <Col sm="9" className="left-border">
                            <PostImageModalRender
                                imageDetailsModal={imageDetailsModal}
                                setImageDetailsModal={setImageDetailsModal}
                                image={image}
                                gotoPostDetails={gotoPostDetails}
                            />
                            <h4>GALLERY</h4>
                            <hr />
                            <GalleryView
                                setImage={setImage}
                                setImageDetailsModal={setImageDetailsModal}
                                images={props.getGalleryResponse && props.getGalleryResponse.success ? props.getGalleryResponse.images : []}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    const getGalleryResponse = state.Post.getGallery;
    return { getGalleryResponse };
};
export default connect(mapStateToProps, null)(OrganizationGallery);
