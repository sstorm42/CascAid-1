import React from 'react';
import { Nav } from 'react-bootstrap';
import { communityFollowerListPage, communityFollowingListPage, communityFriendListPage, communityRequestListPage } from '../../constants/route-paths';
const CommunityMenu = (props) => {
    const selected = props.selected;
    const userType = props.userType || 'NA';
    const menuByUserType = {
        individual: { friend: 1, request: 1, follower: 1, following: 1 },
        admin: { friend: 1, request: 1, follower: 1, following: 1 },
        organization: { follower: 1, following: 1 },
        NA: {},
    };
    return (
        <Nav variant="pills" activeKey={selected}>
            {menuByUserType[userType].friend && (
                <Nav.Item size="sm">
                    <Nav.Link eventKey="friend" href={communityFriendListPage}>
                        Friends
                    </Nav.Link>
                </Nav.Item>
            )}
            {menuByUserType[userType].request && (
                <Nav.Item sz="sm">
                    <Nav.Link eventKey="request" href={communityRequestListPage}>
                        Requests
                    </Nav.Link>
                </Nav.Item>
            )}
            {menuByUserType[userType].follower && (
                <Nav.Item sz="sm">
                    <Nav.Link eventKey="follower" href={communityFollowerListPage}>
                        Followers
                    </Nav.Link>
                </Nav.Item>
            )}
            {menuByUserType[userType].following && (
                <Nav.Item sz="sm">
                    <Nav.Link eventKey="following" href={communityFollowingListPage}>
                        Followings
                    </Nav.Link>
                </Nav.Item>
            )}
        </Nav>
    );
};
export default CommunityMenu;
