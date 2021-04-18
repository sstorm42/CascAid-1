import React from 'react';
import { Container, Row, Col, ProgressBar, Button, Card, CardColumns, Badge } from 'react-bootstrap';
import { individualHeaders, totalIndividualStep } from '../../constants/step-headers';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { FollowButtonRender } from '../../components/form_template/buttons-render';
const DescriptionRender = (description) => {
    if (description) {
        if (description.length < 101) return description;
        else return description.substr(0, 100) + '...';
    } else return 'No description available';
};
const SuggestionList = (props) => {
    const organizations = props.allOrganizations.slice(0, 20);

    return (
        <Container className="saLoginForm">
            <Row>
                <Col></Col>
                <Col md="8" className="sign-ing-form">
                    <br />

                    <p>
                        Step {individualHeaders[6].stepNo} of {totalIndividualStep}
                    </p>
                    <ProgressBar now={individualHeaders[6].percent} />
                    <br />
                    <h4>{individualHeaders[6].header}</h4>

                    <br />

                    <CardColumns>
                        {organizations &&
                            organizations.length > 0 &&
                            organizations.map((org, i) => {
                                return (
                                    <Card className="special-btn special-card" key={i}>
                                        <Card.Img
                                            variant="top"
                                            src={org.profilePicture ? org.profilePicture : defaultOrganizationProfilePicture}
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
                                            <Card.Text className="left-text bold-text">{org.name}</Card.Text>
                                            <Card.Text>
                                                {org.organizationTypes &&
                                                    org.organizationTypes.length > 0 &&
                                                    org.organizationTypes.map((type, i) => {
                                                        return (
                                                            <Badge variant="info" className="badge-single-small" key={i}>
                                                                {type.label}
                                                            </Badge>
                                                        );
                                                    })}
                                            </Card.Text>
                                            <Card.Text className="justify-text">
                                                <small>{DescriptionRender(org.description)}</small>
                                            </Card.Text>

                                            <Card.Text>
                                                {org.impactAreas &&
                                                    org.impactAreas.length > 0 &&
                                                    org.impactAreas.map((area, i) => {
                                                        return (
                                                            <Badge variant="light" className="badge-single-small impact-area-badge" key={i}>
                                                                {area.label}
                                                            </Badge>
                                                        );
                                                    })}
                                            </Card.Text>
                                            <Card.Text>
                                                {org.address ? (
                                                    <Row>
                                                        <Col>
                                                            <small>
                                                                {org.address.street1 +
                                                                    ' ' +
                                                                    org.address.street2 +
                                                                    ' ' +
                                                                    org.address.city +
                                                                    ' ' +
                                                                    org.address.code}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                ) : (
                                                    <></>
                                                )}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <FollowButtonRender
                                                onClick={() => {
                                                    alert('OK');
                                                }}
                                            />
                                        </Card.Footer>
                                    </Card>
                                );
                            })}
                    </CardColumns>
                    <div style={{ height: 100 }} />

                    <Row>
                        <Col sm="6">
                            <Button
                                className="btn signUpBtn"
                                size="sm"
                                onClick={() => {
                                    props.handleBackButton();
                                }}
                            >
                                Back
                            </Button>
                        </Col>
                        <Col sm="6" className="right-align">
                            <Button
                                className="btn signUpBtn"
                                size="sm"
                                onClick={() => {
                                    props.handleSkipButton();
                                }}
                            >
                                Skip
                            </Button>
                        </Col>
                    </Row>
                    <br />
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};
export default SuggestionList;