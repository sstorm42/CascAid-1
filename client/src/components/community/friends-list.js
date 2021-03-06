import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultIndividualProfilePicture } from '@Constants/default-images';
import { MessageButtonRender } from '../form_template/buttons-render';
const SampleOrgList = (props) => {
    const friendships = props.friendships;
    const userId = props.userId;
    const handleGotoUserDetails = props.handleGotoUserDetails;
    console.log('🚀 ~ file: friends-list.js ~ line 5 ~ SampleOrgList ~ friendships', friendships);
    if (friendships && friendships.length > 0) {
        return (
            <>
                {/* <h4>Total {friendships.length} Friend Found</h4> */}
                <br />
                <CardColumns className="five-columns">
                    {friendships.map((friendship, i) => {
                        let name = '';
                        let profilePicture = defaultIndividualProfilePicture;
                        let friendId = '';
                        if (friendship.senderId === userId) {
                            name = friendship.receiverFirstName + ' ' + friendship.receiverLastName;
                            profilePicture = friendship.receiverProfilePicture;
                            friendId = friendship.receiverId;
                        } else if (friendship.receiverId === userId) {
                            name = friendship.senderFirstName + ' ' + friendship.senderLastName;
                            profilePicture = friendship.senderProfilePicture;
                            friendId = friendship.senderId;
                        }
                        return (
                            <Card className="special-btn">
                                <Card.Img
                                    variant="top"
                                    src={profilePicture}
                                    onClick={() => {
                                        handleGotoUserDetails(friendId);
                                    }}
                                />
                                <Card.Body
                                    onClick={() => {
                                        handleGotoUserDetails(friendId);
                                    }}
                                >
                                    <Card.Title>{name}</Card.Title>
                                </Card.Body>
                                <Card.Footer>
                                    <MessageButtonRender
                                        onClick={() => {
                                            props.handleOpenMessageModal({ userId: friendId, name });
                                        }}
                                    />
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </CardColumns>
            </>
        );
    } else return <h4>No Friends Found</h4>;
};
export default SampleOrgList;
