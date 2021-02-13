import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPublicInfo } from '../../actions/individual-action';
import LoadingAnim from '../../components/form_template/loading-anim';
import DetailsView from '../../components/individual/individual-details-view';
const IndividualDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const getInitialInfo = () => {
        const individualUserId = props.match.params.userId;
        props.dispatch(getPublicInfo(individualUserId));
    };
    useEffect(() => {
        getInitialInfo();
    }, [props.auth, props.match.params.userId]);

    if (loading) return <LoadingAnim />;
    else
        return (
            <Container>
                <Row>
                    <Col className="parent-page">
                        <DetailsView individual={props.getPublicInfoResponse.success ? props.getPublicInfoResponse.individual : {}} />
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    const getPublicInfoResponse = state.Individual.getPublicInfo;
    console.log('🚀 ~ file: individual-details.js ~ line 31 ~ mapStateToProps ~ getPublicInfoResponse', getPublicInfoResponse);
    return {
        getPublicInfoResponse,
    };
};
export default connect(mapStateToProps, null)(IndividualDetails);
