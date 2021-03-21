import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown, Modal, Button } from 'react-bootstrap';
import * as DefaultImages from '../../constants/default-images';
import * as RoutePaths from '../../constants/route-paths';
import { FaPlus } from 'react-icons/fa';
import SampleNews from './sample-news';
const ManagePosts = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ButtonRender = (variant, type, label) => {
        return (
            <Button
                style={{ marginTop: 5, width: '100%' }}
                variant={variant}
                size="sm"
                onClick={() => {
                    props.history.push(RoutePaths.postCreatePage(type));
                }}
            >
                {label}
            </Button>
        );
    };
    const DropdownItemRender = (variant, type, label) => {
        return <Dropdown.Item href={RoutePaths.postCreatePage(type)}>{label}</Dropdown.Item>;
    };
    return (
        <Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Post Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="6">{ButtonRender('info', 'event', 'Event')}</Col>
                        <Col sm="6">{ButtonRender('info', 'project', 'Project')}</Col>
                        <Col sm="6">{ButtonRender('info', 'general', 'General Post')}</Col>
                        <Col sm="6">{ButtonRender('info', 'volunteering', 'Volunteering')}</Col>
                        <Col sm="6">{ButtonRender('info', 'in-kind', 'In-Kind')}</Col>
                        <Col sm="6">{ButtonRender('info', 'advocacy', 'Advocacy')}</Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} size="sm">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row>
                <Col className="parent-page">
                    <h1>MANAGE POSTS</h1>
                    <Row>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm" drop="left">
                                    <FaPlus /> POST
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {DropdownItemRender('info', 'event', 'Event')}
                                    {DropdownItemRender('info', 'project', 'Project')}
                                    {DropdownItemRender('info', 'general', 'General Post')}
                                    {DropdownItemRender('info', 'volunteering', 'Volunteering')}
                                    {DropdownItemRender('info', 'in-kind', 'In-Kind')}
                                    {DropdownItemRender('info', 'advocacy', 'Advocacy')}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={handleShow} size="sm">
                                Create Post
                            </Button>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col className="left-align">
                            {ButtonRender('info', RoutePaths.eventCreatePage, 'Event')}&nbsp;
                            {ButtonRender('info', RoutePaths.projectCreatePage, 'Project')}&nbsp;
                            {ButtonRender('info', RoutePaths.postCreatePage, 'General Post')}&nbsp;
                            {ButtonRender('info', RoutePaths.volunteeringCreatePage, 'Volunteering')}&nbsp;
                            {ButtonRender('info', RoutePaths.volunteeringCreatePage, 'In-Kind')}&nbsp;
                            {ButtonRender('info', RoutePaths.volunteeringCreatePage, 'Advocacy')}&nbsp;
                        </Col>
                    </Row> */}
                    <hr />
                    <Row>
                        <Col sm="12">
                            <SampleNews />
                        </Col>
                    </Row>
                    {/* <CardDeck>
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
                                    
                                </Row>
                            </Card.Footer>
                        </Card>
                    </CardDeck> */}
                </Col>
            </Row>
        </Container>
    );
};
export default ManagePosts;
