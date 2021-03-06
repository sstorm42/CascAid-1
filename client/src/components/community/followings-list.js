import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '@Constants/default-images';
import React from 'react';
import { Badge, Card, CardColumns } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { MessageButtonRender, UnfollowUserButtonRender } from '../form_template/buttons-render';
const FollowingList = (props) => {
    const followings = props.followings;
    const cards = props.cards;
    // const userId = props.userId;
    const handleGotoUserDetails = props.handleGotoUserDetails;
    const getUserTypeName = {
        individual: 'INDIVIDUAL',
        organization: 'ORGANIZATION',
    };
    console.log('🚀 ~ file: friends-list.js ~ line 5 ~ SampleOrgList ~ friendships', followings);
    if (followings && followings.length > 0) {
        return (
            <>
                {/* <h4>Total {followings.length} Following Found</h4> */}
                <br />
                <CardColumns className="five-columns">
                    {followings.map((following, i) => {
                        let name = '';
                        let profilePicture = '';
                        if (following.followingUserType === 'individual') {
                            name = following.followingFirstName + ' ' + following.followingLastName;
                            profilePicture = following.followingProfilePicture ? following.followingProfilePicture : defaultIndividualProfilePicture;
                        } else if (following.followingUserType === 'organization') {
                            name = following.followingName;
                            profilePicture = following.followingProfilePicture ? following.followingProfilePicture : defaultOrganizationProfilePicture;
                        }
                        return (
                            <CSSTransition
                                in={cards[following._id]}
                                timeout={{
                                    enter: 0,
                                    exit: 2000,
                                }}
                                unmountOnExit
                                classNames="my-node"
                                key={i}
                            >
                                <Card>
                                    <div className="home-post-image-dark">
                                        <Card.Img
                                            className="special-btn"
                                            variant="top"
                                            src={profilePicture}
                                            alt="Following"
                                            onClick={() => {
                                                handleGotoUserDetails(following.followingUserType, following.followingId);
                                            }}
                                        />
                                        <Badge variant="primary" className="image-text-top-left-small">
                                            {getUserTypeName[following.followingUserType]}
                                        </Badge>
                                    </div>
                                    <Card.Body
                                        className="special-btn"
                                        onClick={() => {
                                            handleGotoUserDetails(following.followingUserType, following.followingId);
                                        }}
                                    >
                                        <Card.Title>{name}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <UnfollowUserButtonRender
                                            onClick={() => {
                                                props.handleUnfollowUser(following._id, following.followingId);
                                            }}
                                        />
                                        <MessageButtonRender
                                            onClick={() => {
                                                props.handleOpenMessageModal({ userId: following.followingId, name });
                                            }}
                                        />
                                    </Card.Footer>
                                </Card>
                            </CSSTransition>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else return <h4>No Following Found</h4>;
};
export default FollowingList;
