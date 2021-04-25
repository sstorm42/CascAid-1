import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import OrganizationListView from '../../components/organization/organization-list-view';
import { getAllGlobalImpactAreas } from '../../actions/impact-area-action';
import { getAllUsers } from '../../actions/user-action';
import { getAllOrganizationTypes } from '../../actions/organization-type-action';
import SearchMenu from '../../components/search/search-menu';
import FilterOrganization from '../../components/search/filter-organization';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import OrganizationMapView from '../../components/organization/organization-map-view';
import Pagination from 'react-js-pagination';
import { defaultCurrentLocation } from '../../constants/default-user-information';

const SearchOrganization = (props) => {
    const [currentLocation, setCurrentLocation] = useState(defaultCurrentLocation);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [filter, setFilter] = useState({
        name: '',
        impactAreas: [],
        organizationTypes: [],
        serviceArea: '',
        address: '',
        keyword: '',
        keywords: [],
    });
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);
            if (position) {
                const coords = position.coords;
                setCurrentLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
            }
        });
    }, []);
    const resetFilter = () => {
        setFilter({
            name: '',
            impactAreas: [],
            organizationTypes: [],
            serviceArea: '',
            address: '',
            keyword: '',
            keywords: [],
        });
    };
    const changeFilter = (key, value) => {
        console.log('🚀 ~ file: search-organization.js ~ line 53 ~ changeFilter ~ key, value', key, value);
        let filter_ = filter;
        filter[key] = value;
        console.log(filter_);
        setFilter({ ...filter_ });
    };
    const handleOnApplyFilter = () => {
        setLoading(true);
        props.dispatch(getAllUsers({ ...filter, userType: 'organization' }));
        setLoading(false);
        setActivePage(1);
        console.log('FFF', filter);
    };
    const gotoOrganizationDetails = (userId) => {
        props.history.push(`/organization/details/${userId}`);
    };
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            props.dispatch(getAllGlobalImpactAreas());
            props.dispatch(getAllOrganizationTypes());
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
                        <SearchMenu selected="organization" />
                        <hr />
                        <FilterOrganization
                            changeFilter={changeFilter}
                            resetFilter={resetFilter}
                            handleOnApplyFilter={handleOnApplyFilter}
                            filter={filter}
                            organizationTypes={props.getOrganizationTypeResponse?.success ? props.getOrganizationTypeResponse.organizationTypes : []}
                            impactAreas={props.getImpactAreaResponse?.success ? props.getImpactAreaResponse.impactAreas : []}
                        />
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
                                    totalItemsCount={props.getAllOrganizationsResponse.success ? props.getAllOrganizationsResponse.users.length : 0}
                                    pageRangeDisplayed={5}
                                    onChange={(page) => {
                                        setActivePage(page);
                                    }}
                                />
                                <OrganizationListView
                                    allOrganizations={
                                        props.getAllOrganizationsResponse.success
                                            ? props.getAllOrganizationsResponse.users.slice((activePage - 1) * 30, activePage * 30 - 1)
                                            : []
                                    }
                                    gotoOrganizationDetails={gotoOrganizationDetails}
                                />
                            </>
                        )}
                        {viewType === 'map' && (
                            <OrganizationMapView
                                allOrganizations={props.getAllOrganizationsResponse.success ? props.getAllOrganizationsResponse.users : []}
                                gotoOrganizationDetails={gotoOrganizationDetails}
                                zoom={8}
                                currentLocation={currentLocation}
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getGlobalImpactAreas;
    const getOrganizationTypeResponse = state.OrganizationType.getAllOrganizationTypes;
    const getAllOrganizationsResponse = state.User.getAllUsers;
    return {
        getImpactAreaResponse,
        getAllOrganizationsResponse,
        getOrganizationTypeResponse,
    };
};
export default connect(mapStateToProps, null)(SearchOrganization);
