import { communityActivitySearchPage, organizationSearchPage } from '@Constants/route-paths';
import React from 'react';
import { Nav } from 'react-bootstrap';
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
