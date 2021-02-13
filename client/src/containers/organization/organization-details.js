import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPublicInfo } from '../../actions/organization-action';
import LoadingAnim from '../../components/form_template/loading-anim';
import DetailsView from '../../components/organization/organization-details-view';
const OrganizationDetails = (props) => {
    const [loading, setLoading] = useState(false);
    const getInitialInfo = () => {
        const organizationUserId = props.match.params.userId;
        props.dispatch(getPublicInfo(organizationUserId));
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
                        <DetailsView organization={props.getPublicInfoResponse.success ? props.getPublicInfoResponse.organization : {}} />
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    const getPublicInfoResponse = state.Organization.getPublicInfo;
    return {
        getPublicInfoResponse,
    };
};
export default connect(mapStateToProps, null)(OrganizationDetails);
