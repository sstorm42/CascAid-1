import React from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import { organizationSearchPage, communityActivitySearchPage } from '../../constants/route-paths';
const SearchMenu = (props) => {
    const selected = props.selected;
    return (
        <Nav variant="pills" activeKey={selected}>
            <Nav.Item sz="sm">
                <Nav.Link eventKey="organization" href={organizationSearchPage}>
                    Organization
                </Nav.Link>
            </Nav.Item>
            <Nav.Item sz="sm">
                <Nav.Link eventKey="community-activity" href={communityActivitySearchPage}>
                    Community Activity
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};
export default SearchMenu;
