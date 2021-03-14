import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const PostList = (props) => {
    const allPosts = props.allPosts;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allPosts && allPosts.length > 0) {
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col sm="6">
                                <h4>{allPosts.length} Posts Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    size="sm"
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToPostCreate();
                                    }}
                                >
                                    Create Post
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPosts.map((post, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td
                                                className="row-details"
                                                onClick={() => {
                                                    props.handleGoToPostDetails(post._id);
                                                }}
                                            >
                                                {post.title}
                                            </td>
                                            <td>{descriptionRender(post.description)}</td>
                                            <td>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        props.handleGoToPostEdit(post._id);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    } else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col sm="6">
                                <h4>No Posts Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToPostCreate();
                                    }}
                                >
                                    Create Post
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
};
export default PostList;
