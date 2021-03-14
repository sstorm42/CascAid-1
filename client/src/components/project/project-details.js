import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import moment from 'moment';
import { TagWithLabelRender, DescriptionRender, ImageAndDescriptionRender, InfoRender } from '../form_template/details-render';
import { LikeButtonRender, GoingButtonRender } from '../form_template/buttons-render';
import ProjectMapView from './project-map-view';
import * as RoutePath from '../../constants/route-paths';
const DisplayProject = (props) => {
    const project = props.project;
    const organization = props.organization;
    if (project && project._id && organization) {
        console.log(organization.basicInfo);
        const name = organization.basicInfo && organization.basicInfo.name ? organization.basicInfo.name : 'Organization Name Not Found';
        const profilePicture = organization.basicInfo && organization.basicInfo.profilePicture ? organization.basicInfo.profilePicture : defaultOrganizationProfilePicture;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col md="10" className="parent-page">
                        <Row>
                            <Col>
                                <h4>{project.title}</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="1">
                                <Avatar src={profilePicture} round size="50" />
                            </Col>
                            <Col sm="8">
                                <Link to={'/organization/details/' + organization.userId}>
                                    {' '}
                                    <h6>{name}</h6>
                                </Link>
                                <small>Created At {moment(project.createdAt).format('LLLL')}</small>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>{TagWithLabelRender('Impact Areas', project.impactAreas)}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>{TagWithLabelRender('Skills', project.skills)}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>{InfoRender('Start Time', moment(project.startDateTime).format('LLLL'))}</Col>
                            <Col>{InfoRender('End Time', moment(project.endDateTime).format('LLLL'))}</Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>{DescriptionRender('', project.description)}</Col>
                        </Row>
                        <Row>
                            <Col>{ImageAndDescriptionRender(project.images)}</Col>
                        </Row>
                        <Row>
                            <Col>
                                <ProjectMapView allProjects={[project]} zoom={16} />
                            </Col>
                        </Row>
                        <div style={{ height: 50 }} />
                        <Row>
                            <Col>
                                <LikeButtonRender
                                    onClick={() => {
                                        alert('YET TO DEVELOP');
                                    }}
                                />
                                &nbsp;
                                <GoingButtonRender
                                    onClick={() => {
                                        alert('YET TO DEVELOP');
                                    }}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        );
    } else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <h4>Project is not available</h4>
                    </Col>
                </Row>
            </Container>
        );
};
export default DisplayProject;
