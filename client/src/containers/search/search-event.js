import React, { useState } from 'react';
import { Container, Row, Col, Image, Nav } from 'react-bootstrap';
import SampleOrgList from './sample-org-list';
const SearchEvent = (props) => {
    const [viewType, setViewType] = useState('list');
    return (
        <Container>
            <Row className="parent-page">
                <Col lg={4}>
                    <Nav variant="pills" activeKey="event">
                        <Nav.Item sz="sm">
                            <Nav.Link eventKey="organization" href="/search/organization">
                                Organization
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item sz="sm">
                            <Nav.Link eventKey="event" href="/search/event">
                                Events
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr />
                    Search Event
                </Col>
                <Col lg={8}>
                    <Nav
                        variant="pills"
                        activeKey={viewType}
                        onSelect={(eventKey) => {
                            setViewType(eventKey);
                        }}
                        size="sm"
                    >
                        <Nav.Item sz="sm">
                            <Nav.Link eventKey="list" title="list">
                                List
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item sz="sm">
                            <Nav.Link eventKey="map" title="map">
                                Map
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <hr />
                    {viewType === 'list' && (
                        <>
                            {' '}
                            <SampleOrgList />
                        </>
                    )}
                    {viewType === 'map' && (
                        <>
                            <Image src="http://localhost:3001/uploaded-images/sample-g-map.png" width="100%" height="auto" thumbnail />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};
export default SearchEvent;
