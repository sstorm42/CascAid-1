import React from 'react';
import { Card, CardColumns, Badge, Row, Col } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '@Constants/default-images';
import { FollowUserButtonRender, UnfollowUserButtonRender, EndorseUserButtonRender, CancelEndorseUserButtonRender } from '../form_template/buttons-render';
const OrganizationListView = (props) => {
    const allOrganizations = props.allOrganizations;
    console.log('🚀 ~ file: organization-list-view.js ~ line 7 ~ OrganizationListView ~ allOrganizations', allOrganizations);
    const followObject = props.followObject;
    const endorseObject = props.endorseObject;
    console.log('🚀 ~ file: organization-list-view.js ~ line 9 ~ OrganizationListView ~ endorseObject', allOrganizations);
    const submitting = props.submitting;

    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allOrganizations && allOrganizations.length > 0) {
        return (
            <CardColumns>
                {allOrganizations.map((org, i) => {
                    if (org && org.basicInfo && org.basicInfo.name) {
                        return (
                            <Card className="special-btn special-card" key={i}>
                                <Card.Img
                                    variant="top"
                                    src={org.basicInfo.profilePicture ? org.basicInfo.profilePicture : defaultOrganizationProfilePicture}
                                    alt="No Image Found"
                                    className="organization-list-image"
                                    onClick={() => {
                                        props.gotoOrganizationDetails(org._id);
                                    }}
                                />
                                <Card.Body
                                    onClick={() => {
                                        props.gotoOrganizationDetails(org._id);
                                    }}
                                >
                                    <Card.Text className="left-text bold-text">{org.basicInfo.name}</Card.Text>
                                    {org.organizationTypes &&
                                        org.organizationTypes.length > 0 &&
                                        org.organizationTypes.map((type, i) => {
                                            return (
                                                <Badge variant="info" className="badge-single-small" key={i}>
                                                    {type.label}
                                                </Badge>
                                            );
                                        })}
                                    {org.impactAreas &&
                                        org.impactAreas.length > 0 &&
                                        org.impactAreas.map((area, i) => {
                                            return (
                                                <Badge variant="light" className="badge-single-small impact-area-badge" key={i}>
                                                    {area.label}
                                                </Badge>
                                            );
                                        })}
                                    {org.basicInfo.address ? (
                                        <Row>
                                            <Col>
                                                <small className="gray-text">
                                                    {org.basicInfo.address.street1 +
                                                        ', ' +
                                                        org.basicInfo.address.street2 +
                                                        ', ' +
                                                        org.basicInfo.address.city +
                                                        ', ' +
                                                        org.basicInfo.address.code}
                                                </small>
                                            </Col>
                                        </Row>
                                    ) : (
                                        <></>
                                    )}
                                    <Card.Text className="justify-text">
                                        <small>{descriptionRender(org.basicInfo.description)}</small>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col sm={6}>
                                            {followObject[org._id] ? (
                                                <UnfollowUserButtonRender
                                                    onClick={() => {
                                                        props.handleUnfollowUser(org._id);
                                                    }}
                                                />
                                            ) : (
                                                <FollowUserButtonRender
                                                    onClick={() => {
                                                        props.handleFollowUser(org._id);
                                                    }}
                                                />
                                            )}
                                        </Col>

                                        <Col sm={6}>
                                            {endorseObject[org._id] ? (
                                                <CancelEndorseUserButtonRender
                                                    onClick={() => {
                                                        props.handleCancelEndorseUser(org._id);
                                                    }}
                                                />
                                            ) : (
                                                <EndorseUserButtonRender
                                                    onClick={() => {
                                                        props.handleEndorseUser(org._id);
                                                    }}
                                                />
                                            )}
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        );
                    }
                })}
            </CardColumns>
        );
    } else return <h4>No Organizations Found</h4>;
};
export default OrganizationListView;
