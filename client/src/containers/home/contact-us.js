import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
const PrivacyPolicy = (props) => {
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <h2>Contact Us</h2>
                    <small>last updated on June 06, 2021</small>
                    <hr />
                    <Row>
                        <Col sm={4}>
                            <label>Full Name</label>
                        </Col>
                        <Col sm={8}>
                            <input type="text" className="form-control" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={4}>
                            <label>Contact Email</label>
                        </Col>
                        <Col sm={8}>
                            <input type="text" className="form-control" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={4}>
                            <label>Address</label>
                        </Col>
                        <Col sm={8}>
                            <input type="text" className="form-control" />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={4}>
                            <label>Concern/Question</label>
                        </Col>
                        <Col sm={8}>
                            <textarea type="text" className="form-control" rows={5} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={4}></Col>
                        <Col sm={8}>
                            <Button type="submit" variant="outline-primary" size="sm">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                    <br />
                    <p style={{ textAlign: 'justify' }}>
                        Donec facilisis enim libero, a tristique neque molestie at. Nullam in ligula quis odio elementum viverra. Cras vel mi ante. Suspendisse
                        faucibus magna eget laoreet imperdiet. Suspendisse tincidunt urna sit amet lacus pretium varius. In in augue semper, tincidunt sapien
                        et, eleifend velit. Aenean vehicula suscipit nisl nec rhoncus. Sed tincidunt cursus sapien, viverra tincidunt arcu egestas sed.
                    </p>
                    <p style={{ textAlign: 'justify' }}>
                        Vestibulum eu leo vitae nulla euismod lobortis ut at erat. Aliquam erat volutpat. Fusce quis ornare tortor. Duis imperdiet nulla commodo
                        interdum congue. Mauris vitae mauris vel lectus congue eleifend. Curabitur ipsum augue, scelerisque non eros sed, lacinia facilisis
                        ante. Vivamus sed semper dolor. Etiam consectetur ipsum sollicitudin massa interdum ornare. Phasellus aliquet velit et ultrices ornare.
                        Maecenas odio odio, faucibus vel dignissim tincidunt, pharetra id lacus.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};
export default PrivacyPolicy;
