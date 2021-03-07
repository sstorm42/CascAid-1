import React from 'react';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';
import { Button, Badge, NavDropdown, Image, Row, Container, Col } from 'react-bootstrap';
import * as RoutePath from '../../constants/route-paths';
import moment from 'moment';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
const RenderBellIcon = () => {
    const count = 99;

    return (
        <Button className="notification-bell">
            {/* <BsBellFill />  */}
            <Image src="http://localhost:3001/default-images/flag-icon.png" roundedCircle />
            <Badge className="notification-count" variant="dark">
                {count}
            </Badge>
        </Button>
    );
};
const NotificationRender = (index) => {
    return (
        <NavDropdown.Item className="notification-row">
            <Row>
                <Col sm="3">
                    <Image src={defaultIndividualProfilePicture} width="40" thumbnail className="notification-image" />
                </Col>
                <Col sm="9">
                    <p className="notification-title">Mr X is Following You.</p>
                    <p className="notification-time">{moment(new Date()).format('LLL')}</p>
                </Col>
            </Row>
        </NavDropdown.Item>
    );
};
const SampleNotificationsRender = () => {
    return (
        <Container style={{ width: 300, padding: 0 }}>
            <NotificationRender />
            <NotificationRender />
            <NotificationRender />
            <NotificationRender />
            <NotificationRender />
        </Container>
    );
};
const GlobalNotification = (props) => {
    return (
        <NavDropdown title={<RenderBellIcon />} id="basic-nav-dropdown" alignRight={true}>
            <SampleNotificationsRender />
            <NavDropdown.Divider />
            <NavDropdown.Item>SEE ALL</NavDropdown.Item>
        </NavDropdown>
    );
    //
};

export default GlobalNotification;
