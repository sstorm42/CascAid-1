import * as RoutePath from '@Constants/route-paths';
import React from 'react';
import { Nav } from 'react-bootstrap';
const PostTypeMenu = (props) => {
    const selected = props.selected;
    const userId = props.userId;
    //
    const RenderNavItem = (key, value) => {
        return (
            <Nav.Item>
                <Nav.Link eventKey={key} href={RoutePath.postListPageByOrganizationAndPostType(userId, key)}>
                    {value}
                </Nav.Link>
            </Nav.Item>
        );
    };
    return (
        <Nav variant="pills" activeKey={selected}>
            {RenderNavItem('event', 'Event')}
            {RenderNavItem('general', 'General')}
            {RenderNavItem('project', 'Project')}
            {RenderNavItem('in-kind', 'In Kind')}
            {RenderNavItem('volunteering', 'Volunteering')}
            {RenderNavItem('advocacy', 'Advocacy')}
            {/* {RenderListButtonItem('Events', RoutePath.postListPageByOrganizationAndPostType(organization.userId, 'event'))}
                        {RenderListButtonItem('Projects', RoutePath.postListPageByOrganizationAndPostType(organization.userId, 'project'))}
                        {RenderListButtonItem('In-Kind', RoutePath.postListPageByOrganizationAndPostType(organization.userId, 'in-kind'))}
                        {RenderListButtonItem('Volunteering', RoutePath.postListPageByOrganizationAndPostType(organization.userId, 'volunteering'))}
                        {RenderListButtonItem('general', RoutePath.postListPageByOrganizationAndPostType(organization.userId, 'general'))}
                        {RenderListButtonItem('Advocacy', RoutePath.postListPageByOrganizationAndPostType(organization.userId, 'advocacy'))} */}
        </Nav>
    );
};
export default PostTypeMenu;
