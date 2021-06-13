import React from 'react';
import { Container, Image, Row, Col, Badge, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import Collapsible from 'react-collapsible';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
import * as RoutePath from '../../constants/route-paths';
import { EndorseUserButtonRender, CancelEndorseUserButtonRender } from '../form_template/buttons-render.js';
const SideMenu = (props) => {
    const organization = props.organization;
    const activePage = props.activePage;
    console.log(organization);
    const follows = props.follows;
    const endorses = props.endorses;
    const RenderListButtonItem = (label, path) => {
        return (
            <Button
                variant={label === activePage ? 'primary' : 'outline-primary'}
                size="sm"
                className="list-button"
                onClick={() => {
                    props.gotoPage(path);
                }}
            >
                {label}
            </Button>
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
                <div style={{ height: 10 }} />
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
                <div style={{ height: 10 }} />
                {endorses ? (
                    <CancelEndorseUserButtonRender
                        onClick={() => {
                            props.handleCancelEndorseClick();
                        }}
                    />
                ) : (
                    <EndorseUserButtonRender
                        onClick={() => {
                            props.handleEndorseClick();
                        }}
                    />
                )}
                <hr />
                {/* <Collapsible trigger="MENU" className="special-btn"> */}
                {RenderListButtonItem('About', RoutePath.userDetailsPage('organization', organization._id))}
                {RenderListButtonItem('Impact', RoutePath.postListPageByOrganizationAndPostType(organization._id, 'event'))}
                {RenderListButtonItem('Message', '')}
                {RenderListButtonItem('Followers', RoutePath.postListPageByOrganizationAndPostType(organization._id, 'event'))}
                {RenderListButtonItem('Feed')}
                {RenderListButtonItem('Gallery', RoutePath.organizationGalleryPage('organization', organization._id))}
                {/* </Collapsible> */}
            </>
        );
    } else return <></>;
};
export default SideMenu;
