import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import IndividualListView from '../../components/individual/individual-list-view';
import { getAllGlobalImpactAreas } from '../../actions/impact-area-action';
import { getAllFollowings, followUser, unfollowUser } from '../../actions/follow-action';
import { getAllEndorsees, endorseUser, cancelEndorseUser } from '../../actions/endorsement-action';
import { getAllIndividuals } from '../../actions/user-action';
import { getAllGlobalSkills } from '../../actions/skill-action';
import SearchMenu from '../../components/search/search-menu';
import IndividualFilter from '../../components/search/individual-filters';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import { getAllCultivationsByUser, addUserToCultivation } from '../../actions/cultivation-action';
import Pagination from 'react-js-pagination';
import { defaultCurrentLocation } from '../../constants/default-user-information';
import CultivationListModal from '../../components/cultivation/cultivation-list-modal';

const SearchIndividual = (props) => {
    const [userId, setUserId] = useState();
    const [currentLocation, setCurrentLocation] = useState(defaultCurrentLocation);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [followObject, setFollowObject] = useState({});
    const [endorseObject, setEndorseObject] = useState({});
    const [cultivationModal, setCultivationModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [filter, setFilter] = useState({
        name: '',
        impactAreas: [],
        skills: [],
        onlyFollowers: false,
        onlyInteractedWithPosts: false,
        onlyLookingForVolunteering: false,
        onlyLookingForProject: false,
        onlyLookingForMembership: false,
    });

    const resetFilter = () => {
        setFilter({
            name: '',
            impactAreas: [],
            skills: [],
            onlyFollowers: false,
            onlyInteractedWithPosts: false,
            onlyLookingForVolunteering: false,
            onlyLookingForProject: false,
            onlyLookingForMembership: false,
        });
    };
    const changeFilter = (key, value) => {
        let filter_ = filter;
        filter[key] = value;
        console.log(filter_);
        setFilter({ ...filter_ });
    };
    const handleOnApplyFilter = () => {
        setLoading(true);
        props.dispatch(getAllIndividuals({ ...filter, userType: 'individual' }));
        if (userId) {
        }
        setLoading(false);
        setActivePage(1);
        console.log('FFF', filter);
    };
    const gotoIndividualDetails = (userId) => {
        props.history.push(`/individual/details/${userId}`);
    };

    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            if (user && user._id) {
                setUserId(user._id);
                props.dispatch(getAllCultivationsByUser(user._id));
                props.dispatch(getAllFollowings(user._id));
                props.dispatch(getAllEndorsees(user._id));
            }
            props.dispatch(getAllGlobalImpactAreas());
            props.dispatch(getAllGlobalSkills());

            setLoading(false);
        };
        getInitialInfo();
    }, []);

    const handleAddUserToCultivationList = (cultivationId) => {
        props.dispatch(addUserToCultivation(cultivationId, selectedUserId));
    };
    const showCultivationListModal = (userId) => {
        setCultivationModal(true);
        setSelectedUserId(userId);
    };
    if (loading) return <LoadingAnim />;
    else
        return (
            <Container>
                <CultivationListModal
                    cultivationModal={cultivationModal}
                    setCultivationModal={setCultivationModal}
                    allCultivations={props.getAllCultivationsResponse.success ? props.getAllCultivationsResponse.allCultivations : []}
                    handleAddUserToCultivationList={handleAddUserToCultivationList}
                />
                <Row className="parent-page">
                    <Col lg={4}>
                        <IndividualFilter
                            changeFilter={changeFilter}
                            resetFilter={resetFilter}
                            handleOnApplyFilter={handleOnApplyFilter}
                            filter={filter}
                            skills={props.getSkillsResponse?.success ? props.getSkillsResponse.skills : []}
                            impactAreas={props.getImpactAreaResponse?.success ? props.getImpactAreaResponse.impactAreas : []}
                            submitting={props.submitting}
                        />
                    </Col>
                    <Col lg={8}>
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={activePage}
                            itemsCountPerPage={30}
                            totalItemsCount={props.getAllIndividualsResponse.success ? props.getAllIndividualsResponse.users.length : 0}
                            pageRangeDisplayed={5}
                            onChange={(page) => {
                                setActivePage(page);
                            }}
                        />
                        <IndividualListView
                            allIndividuals={
                                props.getAllIndividualsResponse.success
                                    ? props.getAllIndividualsResponse.users.slice((activePage - 1) * 30, activePage * 30 - 1)
                                    : []
                            }
                            gotoIndividualDetails={gotoIndividualDetails}
                            showCultivationListModal={showCultivationListModal}
                        />
                    </Col>
                </Row>
            </Container>
        );
};
const mapStateToProps = (state) => {
    console.log(state);
    const getImpactAreaResponse = state.ImpactArea.getGlobalImpactAreas;
    const getSkillsResponse = state.Skill.getGlobalSkills;
    const getAllIndividualsResponse = state.User.getAllIndividuals;
    const getAllFollowingsResponse = state.Follow.getAllFollowings;
    const getAllEndorseesResponse = state.Endorsement.getAllEndorsees;
    const getAllCultivationsResponse = state.Cultivation.getAllCultivations;
    return {
        getImpactAreaResponse,
        getAllIndividualsResponse,
        getSkillsResponse,
        getAllFollowingsResponse,
        getAllEndorseesResponse,
        getAllCultivationsResponse,
    };
};
export default connect(mapStateToProps, null)(SearchIndividual);
