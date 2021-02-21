import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import OrganizationListView from '../../components/organization/organization-list-view';
import { getAllGlobalImpactAreas } from '../../actions/impact-area-action';
import { getAllOrganizationsByFilter } from '../../actions/organization-action';
import { allOrganizationTypes } from '../../constants/organization-types';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import Select from 'react-select';
import Pagination from 'react-js-pagination';

const SearchOrganization = (props) => {
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [filter, setFilter] = useState({
        impactArea: [],
        organizationType: [],
    });

    const changeFilter = (key, value) => {
        let filter_ = filter;
        filter[key] = value;
        setFilter(filter_);
    };
    const handleOnApplyFilter = () => {
        setLoading(true);
        props.dispatch(getAllOrganizationsByFilter(filter));
        setLoading(false);
        setActivePage(1);
    };
    const gotoOrganizationDetails = (userId) => {
        props.history.push(`/organization/details/${userId}`);
    };
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            props.dispatch(getAllGlobalImpactAreas());
            setLoading(false);
        };
        getInitialInfo();
    }, []);
    if (loading) return <LoadingAnim />;
    else
        return (
            <Container>
                <Row className="parent-page">
                    <Col lg={4}>
                        <Nav variant="pills" activeKey="organization">
                            <Nav.Item sz="sm">
                                <Nav.Link eventKey="organization" href="/search/organization">
                                    Organization
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item sz="sm">
                                <Nav.Link eventKey="event" href="/search/event">
                                    Events
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <hr />
                        <label>Impact Area</label>
                        <Select onChange={(value) => changeFilter('impactArea', value)} isMulti={true} options={props.getImpactAreaResponse?.success ? props.getImpactAreaResponse.impactAreas : []} />
                        <br />
                        <label>Organization Type</label>
                        <Select onChange={(value) => changeFilter('organizationType', value)} isMulti={true} options={allOrganizationTypes} />
                        <br />
                        <br />
                        <Button
                            onClick={() => {
                                handleOnApplyFilter();
                            }}
                        >
                            Search
                        </Button>
                        <div style={{ height: 25 }} />
                    </Col>
                    <Col lg={8}>
                        <Nav
                            variant="pills"
                            activeKey={viewType}
                            onSelect={(eventKey) => {
                                setViewType(eventKey);
                            }}
                            size="sm"
                        >
                            <Nav.Item sz="sm">
                                <Nav.Link eventKey="list" title="list">
                                    List
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item sz="sm">
                                <Nav.Link eventKey="map" title="map">
                                    Map
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <hr />
                        {viewType === 'list' && (
                            <>
                                <Pagination
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={activePage}
                                    itemsCountPerPage={30}
                                    totalItemsCount={props.getAllOrganizationsResponse.success ? props.getAllOrganizationsResponse.allOrganizations.length : 0}
                                    pageRangeDisplayed={5}
                                    onChange={(page) => {
                                        setActivePage(page);
                                    }}
                                />
                                <OrganizationListView
                                    allOrganizations={
                                        props.getAllOrganizationsResponse.success ? props.getAllOrganizationsResponse.allOrganizations.slice((activePage - 1) * 30, activePage * 30 - 1) : []
                                    }
                                    gotoOrganizationDetails={gotoOrganizationDetails}
                                />
                            </>
                        )}
                        {viewType === 'map' && (
                            <>
                                <Image src="http://localhost:3001/uploaded-images/sample-g-map.png" width="100%" height="auto" thumbnail />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    const getImpactAreaResponse = state.ImpactArea.getGlobalImpactAreas;
    const getAllOrganizationsResponse = state.Organization.getAllOrganizations;
    return {
        getImpactAreaResponse,
        getAllOrganizationsResponse,
    };
};
export default connect(mapStateToProps, null)(SearchOrganization);
