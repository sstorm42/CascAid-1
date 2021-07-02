import { DeleteButtonRender, ReadButtonRender } from '@Components/form_template/buttons-render';
import moment from 'moment';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
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
                    <Table striped bordered hover responsive size="sm">
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
