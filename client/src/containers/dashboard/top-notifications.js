import React from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import moment from 'moment';
import { ReadButtonRender, UnreadButtonRender, DeleteButtonRender, ListButtonRender } from '../../components/form_template/buttons-render';
const TopNotificationView = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <h5>NOTIFICATIONS</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <ReadButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <ReadButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <ReadButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <ReadButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                </td>
                            </tr>
                            <tr>
                                <td>{moment().format('LLLL')}</td>
                                <td>Donec nunc odio, imperdiet id orci ac, imperdiet volutpat sapien.</td>
                                <td>
                                    <ReadButtonRender />
                                    &nbsp;
                                    <DeleteButtonRender />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </>
    );
};
export default TopNotificationView;
