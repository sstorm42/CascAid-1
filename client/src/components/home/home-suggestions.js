import React from 'react';
import moment from 'moment';
import { Container, Badge, Row, Col, Image, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { FollowButtonRender } from '../../components/form_template/buttons-render';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
const HomeSuggestions = (props) => {
    const organizations = props.allOrganizations;
    console.log('🚀 ~ file: home-suggestions.js ~ line 11 ~ HomeSuggestions ~ organizations', organizations);

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h4">Suggestions</Popover.Title>
            <Popover.Content>The suggestions is based on your profile informations such as location, impact areas, etc.</Popover.Content>
        </Popover>
    );

    return (
        <div>
            <Row>
                <Col sm="10">
                    <h6>
                        Suggestions for you.
                        {/* </Col>
                <Col> */}
                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <a>
                                <BsFillExclamationDiamondFill style={{ marginBottom: 5 }} />
                            </a>
                            {/* <Button variant="light" size="sm" style={{ padding: 0, margin: 0 }}>
                        
                            <BsFillExclamationDiamondFill />
                        </Button> */}
                        </OverlayTrigger>
                    </h6>
                    {/* <small>Based on your profile</small> */}
                </Col>
            </Row>
            <br />
            {organizations.map((org, i) => {
                return (
                    <div key={i} className="post-box">
                        <Row>
                            <Col>
                                <Row>
                                    <Col sm="2">
                                        <Avatar src={org.profilePicture ? org.profilePicture : defaultOrganizationProfilePicture} round={5} size={30} />
                                    </Col>
                                    <Col sm="10">
                                        <Link to={`/organization/details/${org.userId}`}>
                                            {' '}
                                            <h6>{org.name}</h6>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {org.organizationTypes &&
                                    org.organizationTypes.length > 0 &&
                                    org.organizationTypes.map((type, i) => {
                                        return (
                                            <Badge variant="info" className="badge-single-small" key={i}>
                                                {type.label}
                                            </Badge>
                                        );
                                    })}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {org.impactAreas &&
                                    org.impactAreas.length > 0 &&
                                    org.impactAreas.map((area, i) => {
                                        return (
                                            <Badge variant="light" className="badge-single-small impact-area-badge" key={i}>
                                                {area.label}
                                            </Badge>
                                        );
                                    })}
                            </Col>
                        </Row>
                        {org.address ? (
                            <Row>
                                <Col>
                                    <small>{org.address.street1 + ', ' + org.address.street2 + ', ' + org.address.city + ', ' + org.address.code}</small>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                        <br />
                        <Row>
                            <Col>
                                <FollowButtonRender />
                                &nbsp;
                            </Col>
                        </Row>
                    </div>
                );
            })}
        </div>
    );
};
export default HomeSuggestions;
