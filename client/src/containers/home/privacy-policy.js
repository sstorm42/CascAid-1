import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const PrivacyPolicy = (props) => {
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h2>Privacy Policy</h2>
                    <small>last updated on February 02, 2021</small>
                    <p>{}</p>
                </Col>
            </Row>
        </Container>
    );
};
export default PrivacyPolicy;
