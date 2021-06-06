import React from 'react';
import { Card, CardColumns, Badge } from 'react-bootstrap';
import { defaultIndividualProfilePicture, defaultOrganizationProfilePicture } from '../../constants/default-images';
import { MessageButtonRender } from '../form_template/buttons-render';
import { CSSTransition } from 'react-transition-group';
const FollowerList = (props) => {
    const followers = props.followers;
    const cards = props.cards;
    const userId = props.userId;
    const handleGotoUserDetails = props.handleGotoUserDetails;
    const getUserTypeName = {
        individual: 'INDIVIDUAL',
        organization: 'ORGANIZATION',
    };
    console.log('🚀 ~ file: friends-list.js ~ line 5 ~ SampleOrgList ~ friendships', followers);
    if (followers && followers.length > 0) {
        return (
            <>
                {/* <h4>Total {followers.length} Follower Found</h4> */}
                <br />
                <CardColumns className="five-columns">
                    {followers.map((follower, i) => {
                        let name = '';
                        let profilePicture = '';
                        if (follower.followerUserType === 'individual') {
                            name = follower.followerFirstName + ' ' + follower.followerLastName;
                            profilePicture = follower.followerProfilePicture ? follower.followerProfilePicture : defaultIndividualProfilePicture;
                        } else if (follower.followerUserType === 'organization') {
                            name = follower.followerName;
                            profilePicture = follower.followerProfilePicture ? follower.followerProfilePicture : defaultOrganizationProfilePicture;
                        }
                        return (
                            <CSSTransition
                                in={cards[follower._id]}
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
                                            alt="Follower"
                                            onClick={() => {
                                                props.handleGotoUserDetails(follower.followerUserType, follower.followerId);
                                            }}
                                        />
                                        <Badge variant="primary" className="image-text-top-left-small">
                                            {getUserTypeName[follower.followerUserType]}
                                        </Badge>
                                    </div>
                                    <Card.Body
                                        className="special-btn"
                                        onClick={() => {
                                            props.handleGotoUserDetails(follower.followerUserType, follower.followerId);
                                        }}
                                    >
                                        <Card.Title>{name}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <MessageButtonRender
                                            title="Message"
                                            onClick={() => {
                                                props.handleOpenMessageModal({ userId: follower.followerId, name });
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
    } else return <h4>No Follower Found</h4>;
};
export default FollowerList;
