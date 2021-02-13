import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = (props) => {
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h1>Welcome To CascAid</h1>
                </Col>
            </Row>
        </Container>
    );
};
export default Home;
