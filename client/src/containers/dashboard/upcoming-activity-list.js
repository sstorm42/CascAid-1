import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import moment from 'moment';
import {
    ReadButtonRender,
    UnreadButtonRender,
    DeleteButtonRender,
    EditButtonRender,
    DetailsButtonRender,
    ListButtonRender,
} from '../../components/form_template/buttons-render';
const UpcomingActivities = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <h5>UPCOMING ACTIVITIES</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>EVENT</td>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <DetailsButtonRender />
                                    &nbsp;
                                    <EditButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                    &nbsp;
                                    <ListButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>PROJECT</td>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <DetailsButtonRender />
                                    &nbsp;
                                    <EditButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                    &nbsp;
                                    <ListButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>VOLUNTEERING</td>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <DetailsButtonRender />
                                    &nbsp;
                                    <EditButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                    &nbsp;
                                    <ListButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>In-Kind</td>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <DetailsButtonRender />
                                    &nbsp;
                                    <EditButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                    &nbsp;
                                    <ListButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>Advocacy</td>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <DetailsButtonRender />
                                    &nbsp;
                                    <EditButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                    &nbsp;
                                    <ListButtonRender />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
};
export default UpcomingActivities;
