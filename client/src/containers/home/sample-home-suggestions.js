import React from 'react';
import moment from 'moment';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
const SamplePosts = (props) => {
    const posts = [
        {
            type: 'Event',
            id: 0,
            name: 'Moss Montoya Robertson Fleming Carolina Morgan Whitney Gallegos Avis Ryan English Hall ',
            org: 'Patrick Espinoza Flores Anderson',
            description:
                'Minim aliquip esse in esse culpa ullamco duis aute ex occaecat voluptate consequat. Non est pariatur exercitation incididunt deserunt anim minim duis officia et sunt ea sunt. Exercitation et culpa excepteur aute qui irure. Labore dolore dolor sint esse cillum eiusmod pariatur. Aliqua labore nulla non esse consectetur incididunt elit dolore ea exercitation quis elit elit. Qui id laboris cupidatat amet velit ut dolor.\r\n',
            latitude: 25.652657,
            longitude: -72.434629,
            createdAt: '2016-06-20T01:07:40-06:00',
            ttl: 7,
        },
        {
            type: 'Post',
            id: 1,
            name: 'Craig Buck Fitzgerald Kirkland Althea Crane Acevedo Burgess Hines Bernard Rocha Powell ',
            org: 'Hollie Travis Darcy Conner',
            description:
                'Mollit ut et quis veniam eiusmod enim fugiat Lorem qui in minim. Elit id nostrud non officia nostrud ad Lorem commodo. Elit ex velit ipsum magna quis. Non adipisicing veniam id pariatur sint cupidatat enim qui veniam est ipsum velit. Mollit duis eiusmod qui incididunt. Sunt nostrud velit reprehenderit ea mollit pariatur aliqua reprehenderit non excepteur cupidatat consectetur ex incididunt. Elit proident nulla nostrud do.\r\n',
            latitude: 64.109759,
            longitude: -140.925495,
            createdAt: '2016-10-17T07:04:01-06:00',
            ttl: 7,
        },
        {
            type: 'Project',
            id: 2,
            name: 'Santiago Chaney Tucker Finch Debbie Walker Knowles Padilla Virginia Merrill Celina Pierce ',
            org: 'Logan Perkins Dunlap Heath',
            description:
                'Ex do adipisicing ullamco ad sint. Laborum in irure dolor amet pariatur Lorem est magna officia esse qui et dolore. Qui veniam consectetur commodo laborum pariatur qui consectetur ea veniam nisi pariatur nulla cillum veniam. Labore incididunt aliquip in ut consequat nulla anim nostrud ea labore pariatur.\r\n',
            latitude: 67.37103,
            longitude: 10.44369,
            createdAt: '2014-12-04T01:23:05-06:00',
            ttl: 7,
        },
        {
            type: 'Volunteering',
            id: 3,
            name: 'Brittney Jefferson Whitley Mcfadden Watts Blackwell Carson Schmidt Lila Barnett Foster Mccarthy ',
            org: 'Shelly Bryan Kenya Lopez',
            description:
                'In non reprehenderit aliquip sit mollit nisi duis. Eu do voluptate ut consequat qui laboris labore sunt exercitation veniam. Sit sunt dolore excepteur veniam irure laborum occaecat aliquip ad occaecat fugiat incididunt adipisicing irure.\r\n',
            latitude: -34.069339,
            longitude: -112.189468,
            createdAt: '2018-02-26T07:14:01-06:00',
            ttl: 7,
        },
        {
            type: 'In Kind',
            id: 4,
            name: 'Andrews Fry Riddle Weeks Lara Nelson Morton Nichols Rush Cherry Carver Reed ',
            org: 'Waller Williams Ward Bentley',
            description:
                'Id sit tempor laboris irure sint in nisi laboris excepteur ad irure adipisicing. Ipsum officia occaecat consectetur sunt. Do deserunt aute esse irure non est eiusmod ad id ullamco. Aliqua id adipisicing pariatur ea incididunt reprehenderit amet commodo sit pariatur culpa. Duis sint aute exercitation elit pariatur dolor.\r\n',
            latitude: 53.897686,
            longitude: 76.513392,
            createdAt: '2017-12-23T05:01:13-06:00',
            ttl: 7,
        },
    ];
    const mapImage = 'http://cascaid.sky4242.com/default-images/sample-g-map.png';
    return (
        <div>
            <Row>
                <Col>
                    <h6>Suggestions for you.</h6>
                    <small>Based on your profile</small>
                </Col>
            </Row>

            {posts.map((post, i) => {
                return (
                    <div key={i} className="post-box">
                        <Row>
                            <Col sm={3}>
                                <Image src={defaultOrganizationProfilePicture} thumbnail style={{ height: 50, width: 50 }} />
                            </Col>
                            <Col sm="9">
                                <h6>{post.org}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>Organization Type: Non-profit, Political</Col>
                        </Row>
                        <Row>
                            <Col>Impact Areas: ASD ZXC QWE ...</Col>
                        </Row>
                        <Row>
                            <Col>
                                <small>House# 99, Apt# B2, Road# 4/25, Block# A, Dhaka 1213</small>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Button variant="outline-primary" size="sm">
                                    Go to Description
                                </Button>
                                &nbsp;
                                <Button variant="outline-info" size="sm">
                                    Details
                                </Button>
                            </Col>
                        </Row>
                    </div>
                );
            })}
        </div>
    );
};
export default SamplePosts;
