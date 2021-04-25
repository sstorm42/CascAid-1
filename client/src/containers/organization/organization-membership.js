import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import { NotificationManager } from 'react-notifications';
import { organizationCompleteServiceInfoPage, homePage } from '../../constants/route-paths';
import { getAllMemberships, createMembership, updateMembership, deleteMembership, acceptMembership, rejectMembership } from '../../actions/membership-action';
import MembershipForm from '../../components/membership/membership-form';
import { searchUsersByName } from '../../actions';

const Membership = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userSearchText, setUserSearchText] = useState('');
    const [membership, setMembership] = useState({
        individualId: '',
        membershipType: '',
        startTime: {
            month: 1,
            year: 2021,
        },
        endTime: {
            month: 1,
            year: 2021,
        },
        isCurrent: false,
    });
    const getUsers = async (searchText) => {
        if (searchText.length > 2) {
            const users = await searchUsersByName(searchText).then((response) => {
                if (response.success) {
                    return response.users;
                } else return [];
            });
            if (users && users.length > 0) {
                let individuals = [];
                if (users[0].userType === 'individual') {
                    individuals = users[0].users.slice(0, 20);
                } else {
                    individuals = users[1].users.slice(0, 20);
                }
                individuals = individuals.map((ind) => {
                    return {
                        value: ind._id,
                        label: ind.firstName + ' ' + ind.lastName,
                    };
                });
                console.log('🚀 ~ file: individual-membership.js ~ line 43 ~ newPromise ~ organizations', individuals);
                return individuals;
            } else return [{ value: 1, label: 'Not found' }];
        } else return [];
    };
    const handleAcceptMembership = (membershipId) => {
        props.dispatch(acceptMembership(membershipId));
    };
    const handleRejectMembership = (membershipId) => {
        props.dispatch(rejectMembership(membershipId));
    };
    const handleDeleteMembership = (membershipId) => {
        props.dispatch(deleteMembership(membershipId));
    };

    const handleChangeSearchText = async (text) => {
        console.log(text);
        setUserSearchText(text);
    };
    const getInitialInfo = () => {
        const user = props.auth.user;
        if (user && user._id) {
            console.log('Calling list');
            props.dispatch(getAllMemberships({ organizationId: user._id }));
        }
    };

    useEffect(() => {
        const url = window.location.pathname;
        if (url.split('/')[1] === 'edit') setEditMode(true);
        getInitialInfo();
    }, [props.auth, props.setMembershipResponse, props.acceptMembershipResponse, props.rejectMembershipResponse, props.deleteMembershipResponse]);

    const handleMembershipInfoChange = (name, value) => {
        // console.log('🚀 ~ file: individual-membership.js ~ line 73 ~ handleMembershipInfoChange ~ name, value', name, value);
        let membership_ = membership;
        if (name === 'userId') {
            membership_['individualId'] = value;
        } else if (name === 'membershipType') {
            membership_['membershipType'] = value;
        } else if (name === 'startTime') {
            const month = new Date(value).getMonth();
            const year = new Date(value).getFullYear();
            membership_['startTime'] = {
                month,
                year,
            };
        } else if (name === 'endTime') {
            const month = new Date(value).getMonth();
            const year = new Date(value).getFullYear();
            membership_['endTime'] = {
                month,
                year,
            };
        } else if (name === 'isCurrent') {
            membership_['isCurrent'] = value;
        }
        setMembership({ ...membership_ });
    };

    const submitMembership = (mode) => {
        const membership_ = membership;
        membership_['organizationId'] = props.auth.user._id;
        membership_['requestedBy'] = 'organization';
        if (mode === 'create') {
            props.dispatch(createMembership(membership_));
        } else {
            props.dispatch(updateMembership(membership._id, membership_));
        }
    };

    const handleBackButton = () => {
        props.history.push(organizationCompleteServiceInfoPage);
    };
    const handleSkipButton = () => {
        props.history.push(homePage);
    };
    const promiseOptions = (inputValue) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(getUsers(inputValue));
            }, 1000);
        });
    if (loading) return <LoadingAnim />;
    else {
        return (
            <MembershipForm
                editMode={editMode}
                membership={membership}
                handleMembershipInfoChange={handleMembershipInfoChange}
                userSearchText={userSearchText}
                handleChangeSearchText={handleChangeSearchText}
                users={users}
                promiseOptions={promiseOptions}
                submitMembership={submitMembership}
                handleBackButton={handleBackButton}
                handleSkipButton={handleSkipButton}
                memberships={props.getAllMembershipResponse.success ? props.getAllMembershipResponse.memberships : []}
                userType="organization"
                handleAcceptMembership={handleAcceptMembership}
                handleRejectMembership={handleRejectMembership}
                handleDeleteMembership={handleDeleteMembership}
            />
        );
    }
};
const mapStateToProps = (state) => {
    console.log('State', state);
    const getAllMembershipResponse = state.Membership.getAllMemberships;
    const setMembershipResponse = state.Membership.setMembership;
    const acceptMembershipResponse = state.Membership.acceptMembership;
    const rejectMembershipResponse = state.Membership.rejectMembership;
    const deleteMembershipResponse = state.Membership.deleteMembership;
    return { getAllMembershipResponse, setMembershipResponse, acceptMembershipResponse, rejectMembershipResponse, deleteMembershipResponse };
};
export default connect(mapStateToProps, null)(Membership);
