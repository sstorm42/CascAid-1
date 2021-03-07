import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import CommunityMenu from '../../components/community/community-menu';
import { connect } from 'react-redux';
import SampleUsers from './sample-users';
const CommunityFollowers = (props) => {
    return (
        <Container>
            <Row className="parent-page">
                <Col>
                    <CommunityMenu selected="follower" />
                    <hr />
                    <SampleUsers />
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    return {};
};
export default connect(mapStateToProps, null)(CommunityFollowers);
