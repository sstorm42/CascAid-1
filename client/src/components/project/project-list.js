import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

const ProjectList = (props) => {
    const allProjects = props.allProjects;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allProjects && allProjects.length > 0) {
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col sm="6">
                                <h4>{allProjects.length} Projects Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    size="sm"
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToProjectCreate();
                                    }}
                                >
                                    Create Project
                                </Button>
                            </Col>
                        </Row>
                        <br />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProjects.map((project, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td
                                                className="row-details"
                                                onClick={() => {
                                                    props.handleGoToProjectDetails(project._id);
                                                }}
                                            >
                                                {project.title}
                                            </td>
                                            <td>{descriptionRender(project.description)}</td>
                                            <td>
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        props.handleGoToProjectEdit(project._id);
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    } else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <Row>
                            <Col sm="6">
                                <h4>No Projects Found</h4>
                            </Col>
                            <Col sm="6" className="right-align">
                                <Button
                                    className="primary"
                                    onClick={() => {
                                        props.handleGoToProjectCreate();
                                    }}
                                >
                                    Create Project
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
};
export default ProjectList;
