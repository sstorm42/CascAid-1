import React from 'react';
import { Button, Card, CardColumns, Col, Row } from 'react-bootstrap';
import { RiMailSendFill, RiFileList2Line } from 'react-icons/ri';
const CardRender = (props) => {
    const cardHeader = props.cardHeader;
    const cardType = props.cardType;
    const data = props.data;
    const handleViewAllButton = props.handleViewAllButton;
    return (
        <Card border="primary">
            <Card.Header>{cardHeader}</Card.Header>
            <Card.Body>
                {data &&
                    data.length > 0 &&
                    data.map((d, i) => {
                        return (
                            <Row key={i}>
                                <Col sm={8}>
                                    <b>{d.label}</b>
                                </Col>
                                <Col sm={4}>{d.value}</Col>
                            </Row>
                        );
                    })}
            </Card.Body>
            <Card.Footer>
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="dashboard-btn"
                    onClick={() => {
                        handleViewAllButton(cardType);
                    }}
                >
                    <RiFileList2Line /> View All
                </Button>

                <Button variant="outline-primary" size="sm" className="dashboard-btn">
                    <RiMailSendFill /> New {cardHeader}
                </Button>

                <Button variant="outline-primary" size="sm" className="dashboard-btn">
                    <RiMailSendFill /> All {cardHeader}
                </Button>
            </Card.Footer>
        </Card>
    );
};
const SummaryView = (props) => {
    const getFollowerSummaryResponse = props.getFollowerSummaryResponse;
    const getEndorserSummaryResponse = props.getEndorserSummaryResponse;
    const getViewerSummaryResponse = props.getViewerSummaryResponse;
    const handleViewAllButton = props.handleViewAllButton;
    let totalFollowers = 0;
    let totalNewFollowers = 0;
    let totalEndorsers = 0;
    let totalNewEndorsers = 0;
    let totalViewers = 0;
    let totalNewViewers = 0;
    if (getFollowerSummaryResponse && getFollowerSummaryResponse.success) {
        totalFollowers = getFollowerSummaryResponse.totalFollowers;
        totalNewFollowers = getFollowerSummaryResponse.totalNewFollowers;
    }
    if (getEndorserSummaryResponse && getEndorserSummaryResponse.success) {
        totalEndorsers = getEndorserSummaryResponse.totalEndorsers;
        totalNewEndorsers = getEndorserSummaryResponse.totalNewEndorsers;
    }
    if (getViewerSummaryResponse && getViewerSummaryResponse.success) {
        totalViewers = getViewerSummaryResponse.totalViewers;
        totalNewViewers = getViewerSummaryResponse.totalNewViewers;
    }

    return (
        <>
            <Row>
                <Col>
                    <h5>SUMMARY</h5>
                    <CardColumns className="four-columns">
                        <CardRender
                            cardHeader="Followers"
                            cardType="follower"
                            data={[
                                { label: 'Total Followers', value: totalFollowers },
                                { label: 'Last 7 Days', value: totalNewFollowers },
                            ]}
                            handleViewAllButton={handleViewAllButton}
                        />
                        <CardRender
                            cardHeader="Endorsers"
                            cardType="endorser"
                            data={[
                                { label: 'Total Endorsers', value: totalEndorsers },
                                { label: 'Last 7 Days', value: totalNewEndorsers },
                            ]}
                            handleViewAllButton={handleViewAllButton}
                        />
                        <CardRender
                            cardHeader="Viewers"
                            cardType="viewer"
                            data={[
                                { label: 'Total Viewers', value: totalViewers },
                                { label: 'Last 7 Days', value: totalNewViewers },
                            ]}
                            handleViewAllButton={handleViewAllButton}
                        />
                    </CardColumns>
                </Col>
            </Row>
        </>
    );
};
export default SummaryView;
