import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import LineChart from './line-chart';

const StatisticsView = (props) => {
    return (
        <>
            <Row>
                <Col>
                    <h5>STATISTICS</h5>

                    <Row>
                        <Col md={6}>
                            <LineChart />
                        </Col>
                        <Col md={6}>
                            <LineChart />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};
export default StatisticsView;
