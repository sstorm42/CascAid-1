import React, { useState } from 'react';
import { Container, Row, Col, Button, Table, Dropdown, Modal } from 'react-bootstrap';
import { getPostTypeByValue } from '../../constants/post-types';
import { EditButtonRender, DeleteButtonRender, DetailsButtonRender } from '../../components/form_template/buttons-render';
import moment from 'moment';
import * as RoutePaths from '../../constants/route-paths';
import { FaPlus } from 'react-icons/fa';
import { CheckIconRender, CrossIconRender } from '../../components/form_template/icon-render';
const PostList = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const allPosts = props.allPosts;
    const ButtonRender = (variant, type, label) => {
        return (
            <Button
                style={{ marginTop: 5, width: '100%' }}
                variant={variant}
                size="sm"
                onClick={() => {
                    props.handleGoToPostCreate(type);
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
                    <Row>
                        <Col sm="6">{allPosts && allPosts.length > 0 ? <h4>{allPosts.length} Posts Found</h4> : <h4>No Post Found</h4>}</Col>
                        <Col sm="6" className="right-align">
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
                            <br />
                            <Button variant="primary" onClick={handleShow} size="sm">
                                Create Post
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    {allPosts && allPosts.length > 0 && (
                        <Table striped bordered hover>
                            {/* <thead>
                                <tr>
                                    <th>#</th>
                                    <th></th>
                                    <th>Title</th>
                                    <th>Created At</th>
                                    <th>Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead> */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Post Type</th>
                                    <th>Title</th>
                                    <th>Created At</th>
                                    <th>Published</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPosts.map((post, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{getPostTypeByValue(post.postType)[0].label}</td>
                                            <td>{post.title}</td>
                                            <td>{moment(post.createdAt).format('LLL')}</td>
                                            <td>{post.isActive ? <CheckIconRender /> : <CrossIconRender />}</td>
                                            <td>
                                                <DetailsButtonRender
                                                    onClick={() => {
                                                        props.handleGoToPostDetails(post.postType, post._id);
                                                    }}
                                                />{' '}
                                                &nbsp;
                                                <EditButtonRender
                                                    onClick={() => {
                                                        props.handleGoToPostEdit(post.postType, post._id);
                                                    }}
                                                />{' '}
                                                &nbsp;
                                                <DeleteButtonRender
                                                    onClick={() => {
                                                        alert('Not developed yet');
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
    // } else
    //     return (
    //         <Container>
    //             <Row>
    //                 <Col className="parent-page">
    //                     <Row>
    //                         <Col sm="6">
    //                             <h4>No Posts Found</h4>
    //                         </Col>
    //                         <Col sm="6" className="right-align">
    //                             <Button
    //                                 className="primary"
    //                                 onClick={() => {
    //                                     props.handleGoToPostCreate();
    //                                 }}
    //                             >
    //                                 Create Post
    //                             </Button>
    //                         </Col>
    //                     </Row>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     );
};
export default PostList;
