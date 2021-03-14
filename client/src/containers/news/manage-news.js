import React from 'react';
import { Container, Row, Col, Card, CardDeck, ListGroup, Button } from 'react-bootstrap';
import * as DefaultImages from '../../constants/default-images';
import * as RoutePaths from '../../constants/route-paths';
const ManagePosts = (props) => {
    const ButtonRender = (variant, path, label) => {
        return (
            <Button
                style={{ width: '100%', marginTop: 5 }}
                variant={variant}
                size="sm"
                onClick={() => {
                    props.history.push(path);
                }}
            >
                {label}
            </Button>
        );
    };
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h1>MANAGE POSTS</h1>
                    <CardDeck>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultEventIcon} />
                            <Card.Body>
                                <Card.Title>EVENTS</Card.Title>
                            </Card.Body>

                            <Card.Footer>
                                <Row>
                                    {ButtonRender('primary', RoutePaths.eventListByOrganizationPage, 'Manage Events')}
                                    {ButtonRender('info', RoutePaths.eventCreatePage, 'Create Event')}
                                </Row>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultProjectIcon} />
                            <Card.Body>
                                <Card.Title>PROJECTS</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    {ButtonRender('primary', RoutePaths.projectListByOrganizationPage, 'Manage Projects')}
                                    {ButtonRender('info', RoutePaths.projectCreatePage, 'Create Project')}
                                </Row>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultPImage} />
                            <Card.Body>
                                <Card.Title>GENERAL POSTS</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    {ButtonRender('primary', RoutePaths.postListByOrganizationPage, 'Manage General Posts')}
                                    {ButtonRender('info', RoutePaths.postCreatePage, 'Create General Post')}
                                </Row>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultVImage} />
                            <Card.Body>
                                <Card.Title>VOLUNTEERING</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    {ButtonRender('primary', RoutePaths.volunteeringListByOrganizationPage, 'Manage Volunteerings')}
                                    {ButtonRender('info', RoutePaths.volunteeringCreatePage, 'Create Volunteering')}
                                </Row>
                            </Card.Footer>
                        </Card>
                        <Card border="primary">
                            <Card.Img variant="top" src={DefaultImages.defaultIImage} />
                            <Card.Body>
                                <Card.Title>In-Kind</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <Row>
                                    {/* {ButtonRender('primary', RoutePaths.volunteeringListByOrganizationPage, 'Manage Volunteerings')}
                                    {ButtonRender('info', RoutePaths.volunteeringCreatePage, 'Create Volunteering')} */}
                                </Row>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                </Col>
            </Row>
        </Container>
    );
};
export default ManagePosts;
