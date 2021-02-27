import React from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
const SearchMenu = (props) => {
    const selected = props.selected;
    return (
        <Nav variant="pills" activeKey={selected}>
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
    );
};
export default SearchMenu;
