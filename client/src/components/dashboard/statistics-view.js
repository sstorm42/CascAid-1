import React from 'react';
import { Col, Row } from 'react-bootstrap';
import InteractionChart from './interaction-chart';
import LineChart from './line-chart';
const StatisticsView = (props) => {
    const getPostStatisticsResponse = props.getPostStatisticsResponse;
    if (getPostStatisticsResponse && getPostStatisticsResponse.success) {
        const { viewerStatistics, interactionStatistics } = getPostStatisticsResponse.statistics;
        return (
            <>
                <Row>
                    <Col>
                        <h5>STATISTICS</h5>

                        <Row>
                            <Col md={6}>
                                <LineChart viewerStatistics={viewerStatistics} />
                            </Col>
                            <Col md={6}>
                                <InteractionChart interactionStatistics={interactionStatistics} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    } else {
        return <></>;
    }
};
export default StatisticsView;
