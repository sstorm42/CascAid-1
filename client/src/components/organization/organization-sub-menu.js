import React from 'react';
import { Container, Image, Row, Col, Badge, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import Collapsible from 'react-collapsible';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
import * as RoutePath from '../../constants/route-paths';
const SideMenu = (props) => {
    const organization = props.organization;
    console.log(organization);
    const follows = props.follows;
    const RenderListButtonItem = (label, path) => {
        return (
            <ListGroup.Item
                className="list-button"
                onClick={() => {
                    props.gotoPage(path);
                }}
            >
                {label}
            </ListGroup.Item>
        );
    };
    if (organization._id) {
        const basicInfo = organization.basicInfo;
        return (
            <>
                <Image
                    className="left-image"
                    src={basicInfo.profilePicture ? basicInfo.profilePicture : defaultOrganizationProfilePicture}
                    width="100%"
                    thumbnail
                />
                {follows ? (
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Click to unfollow</Tooltip>}>
                        <Button
                            size="sm"
                            variant="outline-info"
                            className="details-following-btn"
                            onClick={() => {
                                props.handleUnfollowClick();
                            }}
                        >
                            <RiUserFollowFill /> Following
                        </Button>
                    </OverlayTrigger>
                ) : (
                    <OverlayTrigger placement="bottom" overlay={<Tooltip>Click to follow</Tooltip>}>
                        <Button
                            size="sm"
                            variant="outline-info"
                            className="details-follow-btn"
                            onClick={() => {
                                props.handleFollowClick();
                            }}
                        >
                            <RiUserFollowFill /> Follow
                        </Button>
                    </OverlayTrigger>
                )}
                <Collapsible trigger="MENU" className="special-btn">
                    <ListGroup>
                        {RenderListButtonItem('About', RoutePath.userDetailsPage('organization', organization._id))}
                        {RenderListButtonItem('Message', '')}
                        {RenderListButtonItem('Impacts', RoutePath.postListPageByOrganizationAndPostType(organization._id, 'event'))}
                        {RenderListButtonItem('Followers', RoutePath.postListPageByOrganizationAndPostType(organization._id, 'event'))}
                        {RenderListButtonItem('Feed')}
                    </ListGroup>
                </Collapsible>
            </>
        );
    } else return <></>;
};
export default SideMenu;
