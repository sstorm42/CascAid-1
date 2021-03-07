import React from 'react';
import { Container, Image, Row, Col, Badge, ListGroup, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { getCountryByCode, getStateByCountryAndCode } from '../../constants/country-and-state';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import Collapsible from 'react-collapsible';
import { RiUserFollowFill, RiUserUnfollowFill } from 'react-icons/ri';
const DetailsView = (props) => {
    const organization = props.organization;
    const follows = props.follows;
    const infoRender = (label, value) => {
        if (value) {
            return (
                <Row>
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                    <Col md="9">
                        {value.split('\n').map((para, i) => (
                            <p key={i} className="justify-text">
                                {para}
                            </p>
                        ))}
                    </Col>
                </Row>
            );
        } else return <></>;
    };

    const keywordsRender = (label, keywords) => {
        return (
            <Row>
                <Col md="3">
                    <b>{label}</b>
                </Col>
                <Col md="9">
                    {keywords.map((key, i) => {
                        return (
                            <Badge variant="primary" key={i} className="badge-single">
                                {key}
                            </Badge>
                        );
                    })}
                </Col>
            </Row>
        );
    };
    const tagsRender = (label, tags) => {
        if (tags && tags.length > 0) {
            return (
                <Row>
                    <Col md="3">
                        <b>{label}</b>
                    </Col>
                    <Col md="9">
                        {tags.map((tag, i) => {
                            if (tag)
                                return (
                                    <Badge variant="primary" key={i} className="badge-single">
                                        {tag.label}
                                    </Badge>
                                );
                        })}
                    </Col>
                </Row>
            );
        } else return <></>;
    };
    const RenderListButtonItem = (label) => {
        return (
            <ListGroup.Item
                className="list-button"
                onClick={() => {
                    alert('YET TO DEVELOP');
                }}
            >
                {label}
            </ListGroup.Item>
        );
    };
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
    if (organization._id) {
        const basicInfo = organization.basicInfo;
        const serviceInfo = organization.serviceInfo;
        const impactAreas = serviceInfo.impactAreas;
        console.log(basicInfo);
        return (
            <Container>
                <Row>
                    <Col className="right-align" sm="2">
                        <Image className="left-image" src={basicInfo.profilePicture ? basicInfo.profilePicture : defaultOrganizationProfilePicture} width="100%" thumbnail />
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
                                {RenderListButtonItem('About')}
                                {RenderListButtonItem('Message')}
                                {RenderListButtonItem('Events')}
                                {RenderListButtonItem('Projects')}
                                {RenderListButtonItem('In-Kind')}
                                {RenderListButtonItem('Volunteering')}
                                {RenderListButtonItem('Feed')}
                            </ListGroup>
                        </Collapsible>
                    </Col>
                    <Col sm="9" className="left-border">
                        <h3>{basicInfo.name}</h3>
                        {tagsRender('Organization Type', basicInfo.organizationTypes)}
                        {infoRender('Contact Email', basicInfo.contactEmail)}
                        {infoRender('Website', basicInfo.website)}

                        {infoRender('Phone', basicInfo.phone)}
                        {infoRender('EIN', basicInfo.ein)}
                        {infoRender('Address', addressMaker(basicInfo.address))}

                        <hr />
                        <div style={{ height: 25 }} />
                        {keywordsRender('Service Areas', serviceInfo.serviceAreas)}
                        {tagsRender('Impact Area', impactAreas)}
                        {keywordsRender('Keywords', serviceInfo.keywords)}
                        <div style={{ height: 25 }} />
                        <hr />
                        {infoRender('Mission', basicInfo.mission)}
                        <hr />
                        {infoRender('Description', basicInfo.description)}
                        <div style={{ height: 25 }} />
                    </Col>
                </Row>
                <div style={{ height: 25 }} />
            </Container>
        );
    } else
        return (
            <Container>
                <h3>No User Found</h3>
            </Container>
        );
};

export default DetailsView;
