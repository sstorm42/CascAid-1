import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SamplePosts from './sample-home-posts';
import SampleSuggestions from './sample-home-suggestions';
const Home = (props) => {
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col md="8">
                            <SamplePosts />
                        </Col>
                        <Col md="4">
                            <SampleSuggestions />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
export default Home;
