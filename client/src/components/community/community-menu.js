import React from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import { communityFollowerListPage, communityFollowingListPage, communityFriendListPage, communityRequestListPage } from '../../constants/route-paths';
const CommunityMenu = (props) => {
    const selected = props.selected;
    return (
        <Nav variant="pills" activeKey={selected}>
            <Nav.Item sz="sm">
                <Nav.Link eventKey="friend" href={communityFriendListPage}>
                    Friends
                </Nav.Link>
            </Nav.Item>
            <Nav.Item sz="sm">
                <Nav.Link eventKey="following" href={communityFollowingListPage}>
                    Followings
                </Nav.Link>
            </Nav.Item>
            <Nav.Item sz="sm">
                <Nav.Link eventKey="follower" href={communityFollowerListPage}>
                    Followers
                </Nav.Link>
            </Nav.Item>
            <Nav.Item sz="sm">
                <Nav.Link eventKey="request" href={communityRequestListPage}>
                    Requests
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
export default CommunityMenu;
