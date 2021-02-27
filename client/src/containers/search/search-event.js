import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Nav, Button } from 'react-bootstrap';
import EventListView from '../../components/event/event-card-view';
import { getAllGlobalImpactAreas } from '../../actions/impact-area-action';
import { getAllEventsByFilter } from '../../actions/event-action';
import EventMapView from '../../components/event/event-map-view';
import SearchMenu from '../../components/search/search-menu';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import Select from 'react-select';
import Pagination from 'react-js-pagination';

const SearchEvent = (props) => {
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [filter, setFilter] = useState({
        title: '',
        impactArea: [],
    });

    const changeFilter = (key, value) => {
        let filter_ = filter;
        filter[key] = value;
        console.log(filter_);
        setFilter(filter_);
    };
    const handleOnApplyFilter = () => {
        setLoading(true);
        props.dispatch(getAllEventsByFilter(filter));
        setLoading(false);
        setActivePage(1);
    };
    const gotoEventDetails = (userId) => {
        props.history.push(`/event/details/${userId}`);
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
    return (
        <Container>
            <Row className="parent-page">
                <Col lg={4}>
                    <SearchMenu selected="event" />
                    <hr />
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="Event title"
                        className="form-control"
                        onChange={(e) => {
                            changeFilter('title', e.target.value);
                        }}
                    />
                    <br />
                    <label>Impact Area</label>
                    <Select onChange={(value) => changeFilter('impactArea', value)} isMulti={true} options={props.getImpactAreaResponse?.success ? props.getImpactAreaResponse.impactAreas : []} />
                    <br />

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
                                totalItemsCount={props.getAllEventsResponse.success ? props.getAllEventsResponse.allEvents.length : 0}
                                pageRangeDisplayed={5}
                                onChange={(page) => {
                                    setActivePage(page);
                                }}
                            />
                            <EventListView
                                allEvents={props.getAllEventsResponse.success ? props.getAllEventsResponse.allEvents.slice((activePage - 1) * 30, activePage * 30 - 1) : []}
                                gotoEventDetails={gotoEventDetails}
                            />
                        </>
                    )}
                    {viewType === 'map' && (
                        <EventMapView allEvents={props.getAllEventsResponse.success ? props.getAllEventsResponse.allEvents.slice((activePage - 1) * 30, activePage * 30 - 1) : []} zoom={6} />
                    )}
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    const getImpactAreaResponse = state.ImpactArea.getGlobalImpactAreas;
    const getAllEventsResponse = state.Event.getAllEvents;
    return {
        getImpactAreaResponse,
        getAllEventsResponse,
    };
};
export default connect(mapStateToProps, null)(SearchEvent);
