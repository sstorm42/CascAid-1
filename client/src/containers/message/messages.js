import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ThreadList from './sample-thread-list';
import ThreadDetails from './sample-thread-details';
const Messages = (props) => {
    return (
        <Container>
            <Row className="message-main">
                <Col sm="4" className="thread-list">
                    <ThreadList />
                </Col>
                <Col sm="8" className="thread-details">
                    <ThreadDetails />
                </Col>
            </Row>
        </Container>
    );
};
export default Messages;
