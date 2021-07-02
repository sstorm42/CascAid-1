import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { DetailsButtonRender, EditButtonRender, DeleteButtonRender } from '../form_template/buttons-render';
import moment from 'moment';
const DescriptionRender = (description) => {
    if (description) {
        if (description.length > 100) return description.substr(0, 100) + '...';
        else return description;
    } else return '';
};
const CultivationList = (props) => {
    const handleGoToCreateCultivationPage = props.handleGoToCreateCultivationPage;
    const handleGoToEditCultivationPage = props.handleGoToEditCultivationPage;
    const handleGoToDisplayCultivationPage = props.handleGoToDisplayCultivationPage;
    const allCultivations = props.allCultivations;
    const handleDeleteCultivation = props.handleDeleteCultivation;
    return (
        <Container>
            <Row>
                <Col className="parent-page">
                    <Row>
                        <Col sm={6}>
                            <h4>Manage Cultivation</h4>
                        </Col>
                        <Col sm={6} className="right-align">
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {
                                    handleGoToCreateCultivationPage();
                                }}
                            >
                                Create Cultivation
                            </Button>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            <Table striped bordered hover responsive size="sm">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Created On</th>
                                        <th>Total User</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allCultivations.map((cultivation, i) => {
                                        let totalUsers = 0;
                                        if (cultivation.users) {
                                            totalUsers = cultivation.users.length;
                                        }
                                        return (
                                            <tr key={i}>
                                                <td>{cultivation.title}</td>
                                                <td>{DescriptionRender(cultivation.description)}</td>
                                                <td>{moment(cultivation.createdAt).format('LL')}</td>
                                                <td className="center-align">{totalUsers}</td>
                                                <td>
                                                    <DetailsButtonRender
                                                        onClick={() => {
                                                            handleGoToDisplayCultivationPage(cultivation._id);
                                                        }}
                                                    />
                                                    &nbsp;
                                                    <EditButtonRender
                                                        onClick={() => {
                                                            handleGoToEditCultivationPage(cultivation._id);
                                                        }}
                                                    />
                                                    &nbsp;
                                                    <DeleteButtonRender
                                                        onClick={() => {
                                                            handleDeleteCultivation(cultivation._id);
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
export default CultivationList;
