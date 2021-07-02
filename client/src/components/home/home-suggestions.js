import { FollowButtonRender } from '@Components/form_template/buttons-render';
import { defaultOrganizationProfilePicture } from '@Constants/default-images';
import React from 'react';
import Avatar from 'react-avatar';
import { Badge, Button, Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { BsFillExclamationDiamondFill } from 'react-icons/bs';
import { RiUserFollowFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
const HomeSuggestions = (props) => {
    const organizations = props.allOrganizations;
    console.log('🚀 ~ file: home-suggestions.js ~ line 11 ~ HomeSuggestions ~ organizations', organizations);
    const cards = props.cards;
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
                    <CSSTransition
                        in={cards[org._id]}
                        timeout={{
                            enter: 0,
                            exit: 2000,
                        }}
                        unmountOnExit
                        classNames="my-node"
                        key={i}
                    >
                        <div className="post-box">
                            <Row>
                                <Col>
                                    <Row>
                                        <Col sm="2">
                                            <Avatar src={org.profilePicture ? org.profilePicture : defaultOrganizationProfilePicture} round="5px" size={30} />
                                        </Col>
                                        <Col sm="10">
                                            <Link to={`/organization/details/${org._id}`}>
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
                                    {/* <FollowButtonRender />
                                    &nbsp; */}
                                    {cards[org._id] ? (
                                        <FollowButtonRender
                                            className="details-follow-btn"
                                            onClick={() => {
                                                props.handleFollowOrganization(org._id);
                                            }}
                                        />
                                    ) : (
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
                                    )}
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                );
            })}
        </div>
    );
};
export default HomeSuggestions;
