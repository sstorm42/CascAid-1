import { addUsersToCultivation, clearAddUsersToCultivation, createCultivation, getAllCultivationsByUser } from '@Actions/cultivation-action';
import { getAllEndorsees } from '@Actions/endorsement-action';
import { getAllFollowings } from '@Actions/follow-action';
import { getAllGlobalImpactAreas } from '@Actions/impact-area-action';
import { getAllGlobalSkills } from '@Actions/skill-action';
import { getAllIndividuals } from '@Actions/user-action';
import CultivationListModal from '@Components/cultivation/cultivation-list-modal';
import LoadingAnim from '@Components/form_template/loading-anim';
import IndividualListView from '@Components/individual/individual-list-view';
import IndividualFilter from '@Components/search/individual-filters';
import { defaultCurrentLocation } from '@Constants/default-user-information';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
const SearchIndividual = (props) => {
    const [userId, setUserId] = useState();
    const [currentLocation, setCurrentLocation] = useState(defaultCurrentLocation);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [viewType, setViewType] = useState('list');
    const [followObject, setFollowObject] = useState({});
    const [endorseObject, setEndorseObject] = useState({});
    const [cultivationModal, setCultivationModal] = useState(false);
    const [createNewCultivation, setCreateNewCultivation] = useState(false);
    const [newCultivation, setNewCultivation] = useState({ title: '', description: '' });
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [selectedMultipleUserId, setSelectedMultipleUserId] = useState([]);
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
        props.dispatch(addUsersToCultivation(cultivationId, selectedUserId));
    };
    const showCultivationListModal = (userIds) => {
        setCultivationModal(true);
        setSelectedUserId(userIds);
    };
    const handleSetNewCultivation = (key, value) => {
        console.log('???? ~ file: search-individual.js ~ line 99 ~ handleSetNewCultivation ~ key, value', key, value);
        const newCultivation_ = newCultivation;
        newCultivation_[key] = value;
        setNewCultivation({ ...newCultivation_ });
    };
    const handleCreateNewCultivation = () => {
        props.dispatch(createCultivation({ ...newCultivation, creatorId: userId }));
        setNewCultivation({ title: '', description: '' });
        setCreateNewCultivation(false);
    };
    useEffect(() => {
        const { success } = props.setCultivationResponse;
        if (success) {
            NotificationManager.success('Cultivation created successfully.', 'success');
            props.dispatch(getAllCultivationsByUser(userId));
        } else if (success === false) {
            NotificationManager.error('Cultivation not created', 'Failed');
        }
    }, [props.setCultivationResponse]);
    useEffect(() => {
        const { success } = props.addUserToCultivationResponse;
        if (success) {
            NotificationManager.success('Users are added successfully.', 'success');
            // setCultivationModal(false);
            props.dispatch(clearAddUsersToCultivation());
        } else if (success === false) {
            NotificationManager.error('Users are not added', 'Failed');
            props.dispatch(clearAddUsersToCultivation());
        }
    }, [props.addUserToCultivationResponse]);
    if (loading) return <LoadingAnim />;
    else
        return (
            <Container>
                <CultivationListModal
                    cultivationModal={cultivationModal}
                    setCultivationModal={setCultivationModal}
                    allCultivations={props.getAllCultivationsResponse.success ? props.getAllCultivationsResponse.allCultivations : []}
                    handleAddUserToCultivationList={handleAddUserToCultivationList}
                    createNewCultivation={createNewCultivation}
                    setCreateNewCultivation={setCreateNewCultivation}
                    newCultivation={newCultivation}
                    handleSetNewCultivation={handleSetNewCultivation}
                    handleCreateNewCultivation={handleCreateNewCultivation}
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
                            selectedMultipleUserId={selectedMultipleUserId}
                            setSelectedMultipleUserId={setSelectedMultipleUserId}
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
    const setCultivationResponse = state.Cultivation.setCultivation;
    const addUserToCultivationResponse = state.Cultivation.addUserToCultivation;
    return {
        getImpactAreaResponse,
        getAllIndividualsResponse,
        getSkillsResponse,
        getAllFollowingsResponse,
        getAllEndorseesResponse,
        getAllCultivationsResponse,
        setCultivationResponse,
        addUserToCultivationResponse,
    };
};
export default connect(mapStateToProps, null)(SearchIndividual);
