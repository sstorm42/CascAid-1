import React, { useState } from 'react';
import moment from 'moment';
import { Container, Row, Col, Image, Button, Modal, Badge } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { FaThumbsUp, FaLocationArrow, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
const SamplePosts = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const posts = [
        {
            type: 'Event',
            id: 0,
            name: 'Moss Montoya Robertson Fleming Carolina Morgan Whitney Gallegos Avis Ryan English Hall ',
            org: 'Patrick Espinoza Flores Anderson',
            description:
                'Minim aliquip esse in esse culpa ullamco duis aute ex occaecat voluptate consequat. Non est pariatur exercitation incididunt deserunt anim minim duis officia et sunt ea sunt. Exercitation et culpa excepteur aute qui irure. Labore dolore dolor sint esse cillum eiusmod pariatur. Aliqua labore nulla non esse consectetur incididunt elit dolore ea exercitation quis elit elit. Qui id laboris cupidatat amet velit ut dolor.\r\n',
            latitude: 25.652657,
            longitude: -72.434629,
            createdAt: '2016-06-20T01:07:40-06:00',
            ttl: 7,
        },
        {
            type: 'Post',
            id: 1,
            name: 'Craig Buck Fitzgerald Kirkland Althea Crane Acevedo Burgess Hines Bernard Rocha Powell ',
            org: 'Hollie Travis Darcy Conner',
            description:
                'Mollit ut et quis veniam eiusmod enim fugiat Lorem qui in minim. Elit id nostrud non officia nostrud ad Lorem commodo. Elit ex velit ipsum magna quis. Non adipisicing veniam id pariatur sint cupidatat enim qui veniam est ipsum velit. Mollit duis eiusmod qui incididunt. Sunt nostrud velit reprehenderit ea mollit pariatur aliqua reprehenderit non excepteur cupidatat consectetur ex incididunt. Elit proident nulla nostrud do.\r\n',
            latitude: 64.109759,
            longitude: -140.925495,
            createdAt: '2016-10-17T07:04:01-06:00',
            ttl: 7,
        },
        {
            type: 'Project',
            id: 2,
            name: 'Santiago Chaney Tucker Finch Debbie Walker Knowles Padilla Virginia Merrill Celina Pierce ',
            org: 'Logan Perkins Dunlap Heath',
            description:
                'Ex do adipisicing ullamco ad sint. Laborum in irure dolor amet pariatur Lorem est magna officia esse qui et dolore. Qui veniam consectetur commodo laborum pariatur qui consectetur ea veniam nisi pariatur nulla cillum veniam. Labore incididunt aliquip in ut consequat nulla anim nostrud ea labore pariatur.\r\n',
            latitude: 67.37103,
            longitude: 10.44369,
            createdAt: '2014-12-04T01:23:05-06:00',
            ttl: 7,
        },
        {
            type: 'Volunteering',
            id: 3,
            name: 'Brittney Jefferson Whitley Mcfadden Watts Blackwell Carson Schmidt Lila Barnett Foster Mccarthy ',
            org: 'Shelly Bryan Kenya Lopez',
            description:
                'In non reprehenderit aliquip sit mollit nisi duis. Eu do voluptate ut consequat qui laboris labore sunt exercitation veniam. Sit sunt dolore excepteur veniam irure laborum occaecat aliquip ad occaecat fugiat incididunt adipisicing irure.\r\n',
            latitude: -34.069339,
            longitude: -112.189468,
            createdAt: '2018-02-26T07:14:01-06:00',
            ttl: 7,
        },
        {
            type: 'In Kind',
            id: 4,
            name: 'Andrews Fry Riddle Weeks Lara Nelson Morton Nichols Rush Cherry Carver Reed ',
            org: 'Waller Williams Ward Bentley',
            description:
                'Id sit tempor laboris irure sint in nisi laboris excepteur ad irure adipisicing. Ipsum officia occaecat consectetur sunt. Do deserunt aute esse irure non est eiusmod ad id ullamco. Aliqua id adipisicing pariatur ea incididunt reprehenderit amet commodo sit pariatur culpa. Duis sint aute exercitation elit pariatur dolor.\r\n',
            latitude: 53.897686,
            longitude: 76.513392,
            createdAt: '2017-12-23T05:01:13-06:00',
            ttl: 7,
        },
    ];
    const people = [
        {
            id: 0,
            name: 'Vera Knowles',
        },
        {
            id: 1,
            name: 'Jefferson Nielsen',
        },
        {
            id: 2,
            name: 'Mari Mcintyre',
        },
        {
            id: 3,
            name: 'Letha Holland',
        },
        {
            id: 4,
            name: 'Alexandra Lawrence',
        },
        {
            id: 5,
            name: 'Bryan Singleton',
        },
    ];
    const mapImage = 'http://localhost:3001/default-images/sample-g-map.png';
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>10 People liked this post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {people.map((ppl, i) => {
                        return (
                            <Container className="ppl-liked-list" key={i}>
                                <Row>
                                    <Col sm={2}>
                                        <Image src="https://picsum.photos/200/200" thumbnail style={{ width: '100%', height: '100%' }} />
                                    </Col>
                                    <Col sm={6} className="v-middle">
                                        {ppl.name}
                                    </Col>
                                    <Col sm={4} className="v-middle">
                                        <Button size="sm">Add Friend</Button>
                                    </Col>
                                </Row>
                            </Container>
                        );
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {posts.map((post, i) => {
                return (
                    <div key={i} className="justify-text post-box">
                        <h4 style={{ color: 'cadetblue' }}>{post.type}</h4>
                        <h5>{post.name}</h5>
                        <Row>
                            <Col>
                                <Row>
                                    <Col sm="1">
                                        <Avatar src={defaultOrganizationProfilePicture} round={5} size="50" />
                                    </Col>
                                    <Col sm="8">
                                        <Link to={'/organization/details/'}>
                                            {' '}
                                            <h6>{post.org}</h6>
                                        </Link>
                                        <small>Created At {moment(post.createdAt).format('LLLL')}</small>
                                    </Col>
                                </Row>
                                {/* <Image src={defaultOrganizationProfilePicture} thumbnail style={{ height: 50, width: 50 }} />
                            {/* </Col>
                            <Col md="10"> */}
                                {/* <small>{moment(post.createdAt).format('LLLL')}</small> */}
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col sm="2">Impact Areas</Col> */}
                            <Col>
                                {post.name.split(' ').map((nm, i) => {
                                    return (
                                        <Badge variant="light" className="badge-single-small impact-area-badge">
                                            {nm}
                                        </Badge>
                                    );
                                })}
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col sm="2">Skills</Col> */}
                            <Col>
                                {post.org.split(' ').map((nm, i) => {
                                    return (
                                        <Badge variant="light" className="badge-single-small skill-badge">
                                            {nm}
                                        </Badge>
                                    );
                                })}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col sm="4" className="home-post-image">
                                <Image src="https://picsum.photos/400/300" thumbnail style={{ width: '100%', height: 'auto' }} />
                                <div className="home-post-image-text">{post.ttl} More Images</div>
                            </Col>
                            <Col sm="8" className="justify-text">
                                {post.description}
                                <a href="#">See More</a>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <Button variant="primary" size="sm">
                                    <FaThumbsUp /> &nbsp;Like
                                </Button>
                                &nbsp;
                                <Button variant="info" size="sm">
                                    <FaHeart /> &nbsp;Interested
                                </Button>
                                &nbsp;
                                <Button variant="secondary" size="sm">
                                    <FaLocationArrow />
                                    &nbsp; Going
                                </Button>
                                &nbsp;
                            </Col>
                            <Col className="right-align">
                                <Button variant="outline-primary" size="sm" onClick={handleShow}>
                                    10 Liked
                                </Button>
                                &nbsp;
                                <Button variant="outline-info" size="sm" onClick={handleShow}>
                                    100 Interested
                                </Button>
                                &nbsp;
                                <Button variant="outline-secondary" size="sm" onClick={handleShow}>
                                    1000 Going
                                </Button>
                                &nbsp;
                            </Col>
                        </Row>
                    </div>
                );
            })}
        </div>
    );
};
export default SamplePosts;
