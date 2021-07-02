import React from 'react';
import { Container, Row, Col, Card, CardColumns, Badge } from 'react-bootstrap';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '@Constants/default-images';
const getUserTypeName = {
    individual: 'INDIVIDUAL',
    organization: 'ORGANIZATION',
};
const UserListRender = ({ users, handleGotoUserDetails }) => {
    return (
        <CardColumns className="five-columns">
            {users.map((user, i) => {
                const basicInfo = user.basicInfo;
                let name = '';
                let profilePicture = '';
                if (user.userType === 'individual') {
                    name = basicInfo.firstName + ' ' + basicInfo.lastName;
                    profilePicture = basicInfo.profilePicture ? basicInfo.profilePicture : defaultIndividualProfilePicture;
                } else if (user.userType === 'organization') {
                    name = basicInfo.name;
                    profilePicture = basicInfo.profilePicture ? basicInfo.profilePicture : defaultOrganizationProfilePicture;
                }
                return (
                    <Card>
                        <div className="home-post-image-dark">
                            <Card.Img
                                className="special-btn"
                                variant="top"
                                src={profilePicture}
                                alt="user"
                                onClick={() => {
                                    handleGotoUserDetails(user.followerUserType, user.followerId);
                                }}
                            />
                            <Badge variant="primary" className="image-text-top-left-small">
                                {getUserTypeName[user.userType]}
                            </Badge>
                        </div>
                        <Card.Body
                            className="special-btn"
                            onClick={() => {
                                handleGotoUserDetails(user.followerUserType, user.followerId);
                            }}
                        >
                            <Card.Title>{name}</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">YET TO DISCUSS</small>
                        </Card.Footer>
                    </Card>
                );
            })}
        </CardColumns>
    );
};
const UserList = (props) => {
    const users = props.users;
    const individuals = users.filter((user) => user.userType === 'individual');
    const organizations = users.filter((user) => user.userType === 'organization');

    const handleGotoUserDetails = props.handleGotoUserDetails;
    return (
        <>
            {individuals && individuals.length > 0 ? (
                <>
                    <h4>INDIVIDUALS</h4>
                    <hr />
                    <UserListRender users={individuals} handleGotoUserDetails={handleGotoUserDetails} />
                </>
            ) : (
                <></>
            )}
            <hr />
            {organizations && organizations.length > 0 ? (
                <>
                    <h4>ORGANIZATIONS</h4>
                    <hr />
                    <UserListRender users={organizations} handleGotoUserDetails={handleGotoUserDetails} />
                </>
            ) : (
                <></>
            )}
        </>
    );
};
export default UserList;
